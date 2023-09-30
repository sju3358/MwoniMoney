package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.ParentDto;
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
public class Parent extends Member {

	@Builder
	public Parent(int status, String uuid, String name, String nickname, String birthday, SocialProvider socialProvider,
		String socialId, String email) {
		super(status, uuid, name, nickname, birthday, socialProvider, socialId, email, MemberRole.PARENT);
	}

	@Override
	public ParentDto convertToDto() {
		return ParentDto.builder()
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
