package com.ntt.mwonimoney.domain.oauth.model.vo;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class MemberPrincipal implements OAuth2User, UserDetails, OidcUser {
	private final String socialId;
	private final String email;
	private final String name;
	private final String password;
	private final SocialProvider socialProvider;
	private final MemberRole roleType;
	private final Collection<GrantedAuthority> authorities;
	private Map<String, Object> attributes;

	public static MemberPrincipal create(Member member) {
		return new MemberPrincipal(member.getSocialId(),
			member.getEmail(),
			member.getName(),
			member.getPassword(),
			member.getProviderType(),
			RoleType.ROLE_USER,
			Collections.singletonList(new SimpleGrantedAuthority(RoleType.ROLE_USER.name())));
	}

	public static MemberPrincipal create(Member member, Map<String, Object> attributes) {
		MemberPrincipal memberPrincipal = create(member);
		memberPrincipal.setAttributes(attributes);

		return memberPrincipal;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getUsername() {
		return socialId;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Map<String, Object> getClaims() {
		return null;
	}

	@Override
	public OidcUserInfo getUserInfo() {
		return null;
	}

	@Override
	public OidcIdToken getIdToken() {
		return null;
	}
}