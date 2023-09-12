package com.ntt.wannabee.domain.member.entity;

import com.ntt.wannabee.domain.member.dto.AdminDto;

import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Admin extends Member {

	@Builder
	public Admin(Byte status, MemberRole memberRole, String name, String nickname, SocialProvider socialProvider,
		String socialId) {
		super(status, memberRole, name, nickname, socialProvider, socialId);
	}

	public AdminDto convertToDto() {
		return AdminDto.builder()
			.idx(this.getIdx())
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.memberRole(this.getMemberRole())
			.socialProvider(this.getSocialProvider())
			.socialId(this.getSocialId())
			.build();
	}
}
