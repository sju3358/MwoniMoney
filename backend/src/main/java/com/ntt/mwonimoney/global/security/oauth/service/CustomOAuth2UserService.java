package com.ntt.mwonimoney.global.security.oauth.service;

import java.util.Optional;

import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.member.entity.Guest;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.global.security.oauth.info.OAuth2MemberInfo;
import com.ntt.mwonimoney.global.security.oauth.info.OAuth2UserInfoFactory;
import com.ntt.mwonimoney.global.security.oauth.model.vo.MemberPrincipal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(userRequest);

		try {
			return this.process(userRequest, user);
		} catch (Exception ex) {
			log.error("CustomOAuth2UserService loadUser Error {} ", ex.getMessage());
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
		SocialProvider socialProvider = SocialProvider.valueOf(
			userRequest.getClientRegistration().getRegistrationId().toUpperCase());

		OAuth2MemberInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(socialProvider, user.getAttributes());
		log.info("before findMember : " + userInfo.getId());

		Optional<Member> foundMember = (Optional<Member>)memberRepository.findMemberBySocialId(userInfo.getId());

		Member savedMember = foundMember.orElseGet(() -> createMember(userInfo, socialProvider));

		log.info("after findMember : " + savedMember.getSocialId());

		return MemberPrincipal.create(savedMember, user.getAttributes(), savedMember.getMemberRole());
	}

	private Guest createMember(OAuth2MemberInfo userInfo, SocialProvider socialProvider) {
		Guest member = Guest.builder()
			.socialId(userInfo.getId())
			.name(userInfo.getName())
			.nickname(userInfo.getName())
			.birthday("0000-00-00")
			.email(userInfo.getEmail())
			.socialProvider(socialProvider)
			.status(0)
			.build();

		memberRepository.saveAndFlush(member);

		return member;
	}
}