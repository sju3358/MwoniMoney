package com.ntt.wannabee.domain.member.entity;

import com.ntt.wannabee.domain.member.dto.ParentDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Parent extends Member {

	private String birthday;

	@Builder
	public Parent(Byte status, MemberRole memberRole, String name, String nickname, SocialProvider socialProvider,
		String socialId, String birthday) {
		super(status, memberRole, name, nickname, socialProvider, socialId);
		this.birthday = birthday;
	}

	public ParentDto convertToDto() {
		return ParentDto.builder()
			.idx(this.getIdx())
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.memberRole(this.getMemberRole())
			.socialProvider(this.getSocialProvider())
			.socialId(this.getSocialId())
			.birthday(this.birthday)
			.build();
	}
}
