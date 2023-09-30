package com.ntt.mwonimoney.global.security.jwt;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.MemberAuth;
import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.global.security.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ntt.mwonimoney.global.security.oauth.util.CookieUtil;

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
	private final MemberRepository memberRepository;
	private final MemberAuthRepository memberAuthRepository;

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
			log.info("Filter Principal: " + authentication.getPrincipal().toString());
			chain.doFilter(request, response);
		}

		if (Objects.equals(validateResult, "isExpired")) {
			Optional<String> cookie = CookieUtil.getCookie(request,
				OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN).map(Cookie::getValue);

			// 쿠키에 리프레시 토큰이 없음. => 로그아웃
			if (cookie.isEmpty()) {
				log.info("쿠키가 없음");
				chain.doFilter(request, response);
			}

			String refreshTokenFromCookie = cookie.get();
			if (!jwtTokenProvider.getIsExipired(refreshTokenFromCookie)) {
				log.info("리프레시 토큰 만료");
				chain.doFilter(request, response);
			}

			String memberUUID = jwtTokenProvider.getMemberUUID(refreshTokenFromCookie);
			MemberAuth memberLoginInfo = memberAuthRepository.findMemberAuthByMemberUUID(memberUUID)
				.orElseThrow(() -> new NoSuchElementException("로그인이 되어있지 않습니다."));

			if (!Objects.equals(memberLoginInfo.getMemberRefreshToken(), refreshTokenFromCookie)) {
				log.info("Redis RT와 쿠키 RT가 다름");
				memberAuthRepository.deleteById(memberUUID);
			} else {

				Member member = memberRepository.findMemberByIdx(memberLoginInfo.getMemberIdx()).orElseThrow();

				Token tokenInfo = jwtTokenProvider.createToken(member.getUuid(), member.getSocialId(),
					member.getMemberRole().name());

				memberAuthRepository.deleteById(memberUUID);

				MemberAuth newMemberLoginInfo = MemberAuth
					.builder()
					.memberIdx(member.getIdx())
					.memberUUID(memberUUID)
					.memberRefreshToken(tokenInfo.getRefreshToken())
					.build();

				memberAuthRepository.save(newMemberLoginInfo);

				CookieUtil.deleteCookie(request, response,
					OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN);
				CookieUtil.addCookie(response, OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN,
					tokenInfo.getRefreshToken(),
					JwtTokenProvider.getRefreshTokenExpireTimeCookie());
				response.setHeader("x-access-token", tokenInfo.getAccessToken());

				Authentication authentication = jwtTokenProvider.getAuthentication(tokenInfo.getAccessToken());
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
			chain.doFilter(request, response);

		}
		chain.doFilter(request, response);
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
