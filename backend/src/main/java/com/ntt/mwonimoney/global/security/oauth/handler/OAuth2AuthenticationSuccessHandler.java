package com.ntt.mwonimoney.global.security.oauth.handler;

import java.io.IOException;
import java.net.URI;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.dto.MemberAuthDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import com.ntt.mwonimoney.global.security.jwt.Token;
import com.ntt.mwonimoney.global.security.oauth.info.OAuth2MemberInfo;
import com.ntt.mwonimoney.global.security.oauth.info.OAuth2UserInfoFactory;
import com.ntt.mwonimoney.global.security.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ntt.mwonimoney.global.security.oauth.util.CookieUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final MemberAuthService memberAuthService;

	@Value("${app.oauth2.authorizedRedirectUris}")
	private String redirectUri;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		String targetUrl = determineTargetUrl(request, response, authentication);

		if (response.isCommitted()) {
			log.error("Response has already been committed. Unable to redirect to " + targetUrl);
			return;
		}

		clearAuthenticationAttributes(request, response);
		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}

	protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) {
		Optional<String> redirectUri = CookieUtil.getCookie(request,
				OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
			.map(Cookie::getValue);

		// if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
		// 	log.error("determineTargetUrl - redirectUri : {} , 인증을 진행할 수 없습니다.", redirectUri);
		// 	throw new IllegalArgumentException(
		// 		"Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
		// }

		String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
		OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken)authentication;
		SocialProvider socialProvider = SocialProvider.valueOf(
			authToken.getAuthorizedClientRegistrationId().toUpperCase());

		OidcUser user = ((OidcUser)authentication.getPrincipal());
		OAuth2MemberInfo memberInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(socialProvider, user.getAttributes());
		Collection<? extends GrantedAuthority> authorities = ((OidcUser)authentication.getPrincipal()).getAuthorities();

		String socialId = memberInfo.getId();
		MemberRole memberRole;
		if (hasAuthority(authorities, MemberRole.PARENT.name())) {
			memberRole = MemberRole.PARENT;
		} else if (hasAuthority(authorities, MemberRole.CHILD.name())) {
			memberRole = MemberRole.CHILD;
		} else {
			memberRole = MemberRole.GUEST;
		}

		Member bySocialId = memberRepository.findMemberBySocialId(socialId).orElseThrow();
		Token tokenInfo = jwtTokenProvider.createToken(bySocialId.getUuid(), socialId,
			memberRole.name());

		log.info("successHanlder : " + bySocialId.getUuid());

		CookieUtil.deleteCookie(request, response, OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN);
		CookieUtil.addCookie(response, OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN,
			tokenInfo.getRefreshToken(),
			JwtTokenProvider.getRefreshTokenExpireTimeCookie());

		memberAuthService.login(
			MemberAuthDto.builder()
				.memberUUID(bySocialId.getUuid())
				.memberIdx(bySocialId.getIdx())
				.memberRefreshToken(tokenInfo.getRefreshToken())
				.build());

		return UriComponentsBuilder.fromUriString(targetUrl)
			.queryParam("accessToken", tokenInfo.getAccessToken())
			.build()
			.toUriString();
	}

	protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		super.clearAuthenticationAttributes(request);
		authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
	}

	private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
		if (authorities == null) {
			return false;
		}
		for (GrantedAuthority grantedAuthority : authorities) {
			if (authority.equals(grantedAuthority.getAuthority())) {
				return true;
			}
		}
		return false;
	}

	private boolean isAuthorizedRedirectUri(String uri) {
		URI clientRedirectUri = URI.create(uri);
		URI authorizedUri = URI.create(redirectUri);

		return authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
			&& authorizedUri.getPort() == clientRedirectUri.getPort();
	}

}