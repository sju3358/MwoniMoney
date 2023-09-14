package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.ParentDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Parent extends Member {

	@Column(name = "member_quiz_reward")
	private int quizReward;
	
	public ParentDto convertToDto() {
		return ParentDto.builder()
			.idx(this.getIdx())
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.birthday(this.getBirthday())
			.socialProvider(this.getSocialProvider())
			.socialId(this.getSocialId())
			.memberRole(this.getMemberRole())
			.quizReward(this.quizReward)
			.build();
	}
}
