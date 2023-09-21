package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

import jakarta.persistence.Column;
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

	@Column(name = "member_credit_score")
	private byte creditScore;

	@Column(name = "member_quiz_reward")
	private int quizReward;

	@Embedded
	private SmallAccount smallAccount;

	@Builder
	public Child(byte status, String name, String nickname, String birthday,
		SocialProvider socialProvider,
		String socialId, String email, byte creditScore, int quizReward, SmallAccount smallAccount) {
		super(status, name, nickname, birthday, socialProvider, socialId, email, MemberRole.CHILD);
		this.creditScore = creditScore;
		this.quizReward = quizReward;
		this.smallAccount = smallAccount;
	}

	public ChildDto convertToDto() {

		return ChildDto.builder()
			.idx(this.getIdx())
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.birthday(this.getBirthday())
			.socialProvider(this.getSocialProvider())
			.socialId(this.getSocialId())
			.memberRole(this.getMemberRole())
			.creditScore(this.creditScore)
			.quizReward(this.quizReward)
			.smallAccount(smallAccount.createVo())
			.build();
	}

}
