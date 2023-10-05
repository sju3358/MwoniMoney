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
	private int creditScore;

	@Column(name = "member_quiz_reward_remain")
	private int quizRewardRemain;

	@Column(name = "member_quiz_reward")
	private int quizReward;

	@Column(name = "member_regular_allowance")
	private int regularAllowance;

	@Column(name = "member_regular_allowance_day")
	private int regularAllowanceDay;

	@Embedded
	private SmallAccount smallAccount;

	public void makeSmallAccount(
		int goalMoney,
		String goalName,
		String imageFilename,
		int saveRatio) {

		SmallAccount accountInfo = new SmallAccount(goalMoney, goalName, imageFilename, saveRatio);
		this.smallAccount = accountInfo;
	}

	public void changeCreditScore(int creditScoreToAdd) {
		int nextCreditScore = this.creditScore + creditScoreToAdd;

		if (0 <= nextCreditScore && nextCreditScore <= 100)
			this.creditScore = nextCreditScore;
		else if (nextCreditScore < 0)
			throw new IllegalArgumentException("신용등급의 최저 점수는 0점입니다");
		else if (nextCreditScore > 100)
			throw new IllegalArgumentException("신용등급의 최저 점수는 100점입니다");
	}

	public void deleteSmallAccount() {
		this.smallAccount = null;
	}

	public void addQuizRewardRemain(int rewardToAdd) {
		if (this.quizReward + rewardToAdd >= 1000000000)
			throw new IllegalArgumentException("최대치 초과");
		this.quizRewardRemain += rewardToAdd;
	}

	public void subQuizRewardRemain(int rewardToSub) {
		if (this.quizRewardRemain - rewardToSub < 0)
			throw new IllegalArgumentException("리워드 한도가 초과 되었습니다.");
		this.quizRewardRemain -= rewardToSub;
	}

	public void changeQuizReward(int reward) {
		if (reward < 0)
			throw new IllegalArgumentException("퀴즈 리워드는 0보다 커야합니다");
		this.quizReward = reward;
	}

	public void changeRegularAllowance(int regularAllowance, int regularAllowanceDay) {
		if (regularAllowance < 0)
			throw new IllegalArgumentException("정기 용돈 금액은 0이상 입니다");
		this.regularAllowance = regularAllowance;

		if (regularAllowanceDay < 0 || regularAllowanceDay > 28)
			throw new IllegalArgumentException("정기 용돈 날짜는 0 ~ 28 사이 입니다");
		this.regularAllowanceDay = regularAllowanceDay;

	}

	@Builder
	public Child(
		int status,
		String uuid,
		String name,
		String nickname,
		String birthday,
		SocialProvider socialProvider,
		String socialId,
		String email,
		int creditScore,
		int quizRewardRemain,
		int quizReward,
		SmallAccount smallAccount,
		String challengeAlarm,
		String balanceAlarm,
		String smallAcountAlarm,
		int regularAllowance,
		int regularAllowanceDay) {

		super(status, uuid, name, nickname, birthday, socialProvider, socialId, email, MemberRole.CHILD, challengeAlarm,
			balanceAlarm, smallAcountAlarm);

		this.quizRewardRemain = quizRewardRemain;
		this.creditScore = creditScore;
		this.quizReward = quizReward;
		this.smallAccount = smallAccount;
		this.regularAllowance = regularAllowance;
		this.regularAllowanceDay = regularAllowanceDay;
	}

	@Override
	public ChildDto convertToDto() {

		return ChildDto.builder()
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.birthday(this.getBirthday())
			.socialProvider(this.getSocialProvider())
			.memberRole(this.getMemberRole())
			.creditScore(this.creditScore)
			.quizRewardRemain(this.quizRewardRemain)
			.quizReward(this.quizReward)
			.regularAllowance(this.regularAllowance)
			.smallAccount(this.smallAccount == null ? null : smallAccount)
			.challengeAlarm(this.getChallengeAlarm())
			.balanceAlarm(this.getBalanceAlarm())
			.smallAcountAlarm(this.getSmallAcountAlarm())
			.email(this.getEmail())
			.build();
	}

}
