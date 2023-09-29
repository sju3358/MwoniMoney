package com.ntt.mwonimoney.global.security.oauth.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final MemberRepository memberRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberRepository.findMemberBySocialId(username).orElseThrow();
		if (member == null) {
			throw new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다.");
		}
		return createUserDetails(member);
	}

	private UserDetails createUserDetails(Member member) {
		return new User(member.getSocialId(),
			"",
			Collections.singletonList(new SimpleGrantedAuthority(member.getMemberRole().name())));
	}
}