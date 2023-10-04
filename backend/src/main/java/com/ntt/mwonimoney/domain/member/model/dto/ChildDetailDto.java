package com.ntt.mwonimoney.domain.member.model.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ChildDetailDto extends MemberDto {

	private int creditScore;
	private int quizRewardRemain;
	private int quizReward;
	private int goalMoney;
	private String goalName;
	private String imageFilename;
	private int remain;

}
