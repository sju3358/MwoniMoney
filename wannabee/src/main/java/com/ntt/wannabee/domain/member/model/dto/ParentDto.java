package com.ntt.wannabee.domain.member.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class ParentDto extends MemberDto {

	private String birthday;
}
