package com.ntt.mwonimoney.domain.oauth.service;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.Parent;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.domain.oauth.exception.OAuthProviderMissMatchException;
import com.ntt.mwonimoney.domain.oauth.info.OAuth2MemberInfo;
import com.ntt.mwonimoney.domain.oauth.info.OAuth2UserInfoFactory;
import com.ntt.mwonimoney.domain.oauth.model.vo.MemberPrincipal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private static final String ALREADY_SIGNED_UP_SOCIAL = "already_signed_up_social";
	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(userRequest);

		try {
			return this.process(userRequest, user);
		} catch (Exception ex) {
			log.error("CustomOAuth2UserService loadUser Error: {} ", ex.getMessage());
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
		SocialProvider socialProvider = SocialProvider.valueOf(
			userRequest.getClientRegistration().getRegistrationId().toUpperCase());

		OAuth2MemberInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(socialProvider, user.getAttributes());
		log.info(userInfo.getId());

		Member savedMember = memberRepository.findMemberBySocialId(userInfo.getId())
			.orElseGet(() -> createMember(userInfo, socialProvider));

		if (socialProvider != savedMember.getSocialProvider()) {
			log.error("CustomOAuth2UserService process Error: 다른 소셜에서 가입된 이메일 입니다. 해당 소셜 로그인을 이용해 주세요.");
			throw new OAuthProviderMissMatchException(ALREADY_SIGNED_UP_SOCIAL);
		}

		return MemberPrincipal.create(savedMember, user.getAttributes());
	}

	private Member createMember(OAuth2MemberInfo userInfo, SocialProvider socialProvider) {
		Member member = Parent.builder()
			.socialId(userInfo.getId())
			.name(userInfo.getName())
			.socialProvider(socialProvider)
			.status((byte)1)
			.build();

		return memberRepository.saveAndFlush(member);
	}
}