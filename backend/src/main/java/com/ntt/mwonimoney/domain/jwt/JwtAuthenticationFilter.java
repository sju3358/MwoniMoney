package com.ntt.mwonimoney.domain.jwt;

import static com.ntt.mwonimoney.domain.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository.*;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.domain.oauth.util.CookieUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String BEARER_TYPE = "Bearer";
	private final JwtTokenProvider jwtTokenProvider;
	private final RedisTemplate<String, String> redisTemplate;
	private final MemberRepository memberRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws
		ServletException,
		IOException {
		String token = resolveToken(request);
		if (token == null) {
			log.info("토큰이 없음");
			chain.doFilter(request, response);
			return;
		}

		String validateResult = jwtTokenProvider.validateToken(token);
		if (Objects.equals(validateResult, "vaild")) {
			log.info("jwt 인증 성공");
			Authentication authentication = jwtTokenProvider.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
			return;
		}

		if (Objects.equals(validateResult, "isExpired")) {
			Optional<String> cookie = CookieUtil.getCookie(request, REFRESH_TOKEN).map(Cookie::getValue);

			// 쿠키에 리프레시 토큰이 없음. => 로그아웃
			if (cookie.isEmpty()) {
				log.info("쿠키가 없음");
				chain.doFilter(request, response);
				return;
			}

			String refreshTokenFromCookie = cookie.get();
			if (!jwtTokenProvider.getIsExipired(refreshTokenFromCookie)) {
				log.info("리프레시 토큰 만료");
				chain.doFilter(request, response);
				return;
			}

			String userSocialId = jwtTokenProvider.parseClaims(refreshTokenFromCookie).getSubject();
			String refreshTokenFromRedis = redisTemplate.opsForValue().get("RT" + userSocialId);

			if (refreshTokenFromRedis == null) {
				log.info("Redis에 RT 없음");
				chain.doFilter(request, response);
				return;
			}

			if (!Objects.equals(refreshTokenFromRedis, refreshTokenFromCookie)) {
				log.info("Redis RT와 쿠키 RT가 다름");
				redisTemplate.opsForValue().getOperations().delete("RT" + userSocialId);
			} else {
				Member member = memberRepository.findMemberBySocialId(userSocialId).orElseThrow();

				Token tokenInfo = jwtTokenProvider.createToken(String.valueOf(member.getUuid()), userSocialId,
					member.getMemberRole().name());

				redisTemplate.opsForValue().getOperations().delete("RT" + userSocialId);
				redisTemplate.opsForValue()
					.set("RT" + userSocialId, tokenInfo.getRefreshToken(), tokenInfo.getExpireTime(),
						TimeUnit.MILLISECONDS);

				CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
				CookieUtil.addCookie(response, REFRESH_TOKEN, tokenInfo.getRefreshToken(),
					JwtTokenProvider.getRefreshTokenExpireTimeCookie());
				response.setHeader("x-access-token", tokenInfo.getAccessToken());

				Authentication authentication = jwtTokenProvider.getAuthentication(tokenInfo.getAccessToken());
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
			chain.doFilter(request, response);
		}
	}

	// Request Header 에서 토큰 정보 추출
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
			return bearerToken.substring(7);
		}
		return null;
	}

}
