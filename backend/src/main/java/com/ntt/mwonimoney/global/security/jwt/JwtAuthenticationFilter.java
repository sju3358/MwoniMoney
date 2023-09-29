package com.ntt.mwonimoney.global.security.jwt;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Objects;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.MemberAuth;
import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.global.security.oauth.exception.UnAuthorizationException;
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

		String accessToken = getAccessToken(request);
		String validateResult = jwtTokenProvider.validateToken(accessToken);

		if (Objects.equals(validateResult, "isExpired")) {

			String refreshToken = CookieUtil.getCookie(request,
					OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN)
				.map(Cookie::getValue)
				.orElseThrow(() -> {
					log.info("쿠키가 없음");
					throw new UnAuthorizationException("쿠키에 토큰이 존재하지 않습니다");
				});

			if (!jwtTokenProvider.getIsExipired(refreshToken)) {
				log.info("리프레시 토큰 만료");
				throw new UnAuthorizationException("리프레쉬 토큰이 만료되었습니다.");
			}

			String memberUUID = jwtTokenProvider.getMemberUUID(refreshToken);
			MemberAuth memberLoginInfo = memberAuthRepository.findMemberAuthByMemberUUID(memberUUID)
				.orElseThrow(() -> new NoSuchElementException("로그인이 되어있지 않습니다."));

			if (!Objects.equals(memberLoginInfo.getMemberRefreshToken(), refreshToken)) {
				log.info("Redis RT와 쿠키 RT가 다름");
				memberAuthRepository.deleteById(memberUUID);
				throw new UnAuthorizationException("잘못된 리프레쉬 토큰입니다.");
			}

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

			chain.doFilter(request, response);

		} else if (Objects.equals(validateResult, "vaild")) {
			log.info("jwt 인증 성공");
			Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
		}
	}

	private String getAccessToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

		if (!(StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)))
			throw new UnAuthorizationException("토큰이 존재하지 않습니다.");

		return bearerToken.substring(7);
	}

}
