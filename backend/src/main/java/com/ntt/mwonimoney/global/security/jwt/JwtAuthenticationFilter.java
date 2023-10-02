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
import com.ntt.mwonimoney.global.security.jwt.exception.ExpiredTokenException;
import com.ntt.mwonimoney.global.security.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ntt.mwonimoney.global.security.oauth.util.CookieUtil;

import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import software.amazon.ion.NullValueException;

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

		try {
			log.info("JWT Authentication Filter Start");
			String token = resolveToken(request);

			if (token == null) {
				log.info("토큰이 없음");
				throw new NullValueException("토큰이 존재하지 않음");
			}

			String validateToken = jwtTokenProvider.validateToken(token);
			if (validateToken.equals("valid")) {
				log.info("jwt 인증 성공");
				Authentication authentication = jwtTokenProvider.getAuthentication(token);
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} else if (validateToken.equals("isExpired")) {
				Token tokenInfo = refreshTokenAndGetToken(request);

				CookieUtil.deleteCookie(request, response,
					OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN);

				CookieUtil.addCookie(response,
					OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN,
					tokenInfo.getRefreshToken(),
					JwtTokenProvider.getRefreshTokenExpireTimeCookie());

				response.setHeader("x-access-token", tokenInfo.getAccessToken());

				Authentication authentication = jwtTokenProvider.getAuthentication(
					tokenInfo.getAccessToken());
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} else {
				throw new MalformedJwtException("토큰이 유효하지 않습니다");
			}
		} catch (ExpiredTokenException e) {
			log.info(e.getMessage());
			response.sendError(401, e.getMessage());
		} catch (NullValueException e) {
			log.info(e.getMessage());
			response.sendError(401, e.getMessage());
		} catch (MalformedJwtException e) {
			log.info(e.getMessage());
			response.sendError(401, e.getMessage());
		} catch (NoSuchElementException e) {
			log.info(e.getMessage());
			response.sendError(401, e.getMessage());
		} catch (Exception e) {
			log.info(e.getMessage());
			response.sendError(500, e.getMessage());
		} finally {
			log.info("JWT Authentication Filter End");
			chain.doFilter(request, response);
		}
	}

	private String getRefreshTokenFromCookie(HttpServletRequest request) {
		return CookieUtil
			.getCookie(request, OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN)
			.map(Cookie::getValue)
			.orElseThrow(() -> new NullValueException("쿠키에 refresh 토큰이 존재하지 않습니다"));
	}

	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
			return bearerToken.substring(7);
		}

		return null;
	}

	private Token refreshTokenAndGetToken(HttpServletRequest request) {
		String refreshToken = getRefreshTokenFromCookie(request);

		if (!jwtTokenProvider.getIsExipired(refreshToken))
			throw new ExpiredTokenException("리프레쉬 토큰이 만료되었습니다");

		String memberUUID = jwtTokenProvider.getMemberUUID(refreshToken);

		MemberAuth memberLoginInfo = memberAuthRepository.findById(memberUUID)
			.orElseThrow(() -> new NoSuchElementException("로그인이 되어있지 않습니다."));

		if (!Objects.equals(memberLoginInfo.getMemberRefreshToken(), refreshToken)) {
			log.info("Redis RT와 쿠키 RT가 다름");
			throw new MalformedJwtException("리프레쉬 토큰이 유효하지 않습니다");
		}

		Member member = memberRepository.findMemberByIdx(memberLoginInfo.getMemberIdx())
			.orElseThrow(() -> new NoSuchElementException("멤버정보가 존재하지 않습니다."));

		Token tokenInfo = jwtTokenProvider.createToken(member.getUuid(), member.getSocialId(),
			member.getMemberRole().name());

		memberAuthRepository.deleteById(memberUUID);
		log.info("기존 로그인정보 삭제");

		MemberAuth newMemberLoginInfo = MemberAuth
			.builder()
			.memberIdx(member.getIdx())
			.memberUUID(memberUUID)
			.memberRefreshToken(tokenInfo.getRefreshToken())
			.build();

		memberAuthRepository.save(newMemberLoginInfo);
		log.info("로그인 정보 저장");

		return tokenInfo;
	}

}
