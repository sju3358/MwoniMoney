package com.ntt.wannabee.domain.member.entity;

import java.util.UUID;

import com.ntt.wannabee.domain.member.model.dto.MemberDto;
import com.ntt.wannabee.domain.member.model.vo.MemberRole;
import com.ntt.wannabee.domain.member.model.vo.SocialProvider;

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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "member")
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idx;

	private String uuid;

	private byte status;

	private String name;

	private String nickname;

	@Enumerated(EnumType.STRING)
	private MemberRole memberRole;

	@Enumerated(EnumType.STRING)
	private SocialProvider socialProvider;

	private String socialId;

	@Builder
	public Member(Byte status, MemberRole memberRole, String name, String nickname, SocialProvider socialProvider,
		String socialId) {
		this.uuid = UUID.randomUUID().toString();
		this.status = status;
		this.memberRole = memberRole;
		this.socialProvider = socialProvider;
		this.socialId = socialId;
		this.name = name;
		this.nickname = nickname;
	}

	public MemberDto convertToDto() {
		return MemberDto.builder()
			.idx(this.idx)
			.uuid(this.uuid)
			.status(this.status)
			.name(this.name)
			.nickname(this.nickname)
			.memberRole(this.memberRole)
			.socialProvider(this.socialProvider)
			.socialId(this.socialId)
			.build();
	}
}
