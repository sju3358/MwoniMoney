package com.ntt.wannabee.domain.member.model.dto;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ParentDto extends MemberDto {

	private int quizReward;

}
