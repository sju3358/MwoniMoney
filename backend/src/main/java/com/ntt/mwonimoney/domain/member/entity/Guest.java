package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.GuestDto;
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
public class Guest extends Member {

	@Builder
	public Guest(int status, String name, String nickname, String birthday, SocialProvider socialProvider,
		String socialId, String email) {
		super(status, name, nickname, birthday, socialProvider, socialId, email, MemberRole.GUEST);
	}

	public GuestDto convertToDto() {
		return GuestDto.builder()
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.birthday(this.getBirthday())
			.socialProvider(this.getSocialProvider())
			.memberRole(this.getMemberRole())
			.build();
	}
}