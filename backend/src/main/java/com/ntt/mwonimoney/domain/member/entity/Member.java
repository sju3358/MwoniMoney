package com.ntt.mwonimoney.domain.member.entity;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ntt.mwonimoney.domain.member.model.dto.GuestDto;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "member")
public abstract class Member extends CommonEntity implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_idx")
	private Long idx;

	@Column(name = "member_uuid", unique = true, nullable = false)
	private String uuid;

	@Column(name = "member_status", nullable = false)
	protected int status;

	@Column(name = "member_name")
	protected String name;

	@Column(name = "member_nickname")
	protected String nickname;

	@Column(name = "member_birthday")
	protected String birthday;

	@Enumerated(EnumType.STRING)
	@Column(name = "member_social_provider")
	private SocialProvider socialProvider;

	@Column(name = "member_social_id", unique = true)
	private String socialId;

	@Column(name = "member_email")
	protected String email;

	@Enumerated(EnumType.STRING)
	@Column(name = "member_role")
	private MemberRole memberRole;

	@Column(name = "FCMToken", length = 300)
	private String FCMToken;

	public void changeMemberRole(MemberRole memberRole) {

		if (this.memberRole.equals(MemberRole.CHILD) || this.memberRole.equals(MemberRole.PARENT)) {
			throw new IllegalArgumentException("멤버 유형은 게스트만 변경 할 수 있습니다.");
		}

		this.memberRole = memberRole;
	}

	public void changeMemberEmail(String email) {
		this.email = email;
	}

	public void changeMemberBirthday(String birthday) {
		this.birthday = birthday;
	}

	public void changeMemberNickname(String nickname) {
		this.nickname = nickname;
	}

	protected Member(int status, String name, String nickname, String birthday,
		SocialProvider socialProvider,
		String socialId, String email, MemberRole memberRole) {
		this.uuid = UUID.randomUUID().toString();
		this.status = status;
		this.name = name;
		this.nickname = nickname;
		this.birthday = birthday;
		this.socialProvider = socialProvider;
		this.socialId = socialId;
		this.email = email;
		this.memberRole = memberRole;
	}

	public MemberDto convertToDto() {
		return GuestDto.builder().build();
	}

	public void updateFCMToken(String FCMToken) {
		this.FCMToken = FCMToken;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(getMemberRole().name()));
	}

	@Override
	public String getPassword() {
		return "";
	}

	@Override
	public String getUsername() {
		return getSocialId();
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
}
