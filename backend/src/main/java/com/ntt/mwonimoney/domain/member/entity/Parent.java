package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.ParentDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Parent extends Member {

	@Column(name = "member_quiz_reward")
	private int quizReward;

	@Builder
	public Parent(byte status, String name, String nickname, String birthday, SocialProvider socialProvider, String socialId, int quizReward){
		super(status, name, nickname, birthday, socialProvider, socialId, MemberRole.PARENT);
		this.quizReward = quizReward;
	}

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
