package com.ntt.wannabee.domain.member.entity;

import com.ntt.wannabee.domain.member.dto.ChildDto;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Child extends Member {

	private String birthday;

	private byte creditScore;

	@Embedded
	private SmallAccount smallAccount;

	@Builder
	public Child(Byte status, MemberRole memberRole, String name, String nickname, SocialProvider socialProvider,
		String socialId, String birthday, byte creditScore, SmallAccount smallAccount) {
		super(status, memberRole, name, nickname, socialProvider, socialId);
		this.birthday = birthday;
		this.creditScore = creditScore;
		this.smallAccount = smallAccount;
	}

	public ChildDto convertToDto() {
		return ChildDto.builder()
			.idx(this.getIdx())
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.memberRole(this.getMemberRole())
			.socialProvider(this.getSocialProvider())
			.socialId(this.getSocialId())
			.birthday(this.birthday)
			.creditScore(this.creditScore)
			.build();
	}
}
