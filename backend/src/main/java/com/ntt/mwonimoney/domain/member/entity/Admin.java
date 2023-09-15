package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.AdminDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

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
	public Admin(byte status, String name, String nickname, SocialProvider socialProvider, String socialId) {

		super(status, name, nickname, "", socialProvider, socialId, MemberRole.ADMIN);

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
