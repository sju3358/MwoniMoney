package com.ntt.wannabee.domain.member.model.dto;

import com.ntt.wannabee.domain.member.model.vo.SmallAccount;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class ChildDto extends MemberDto {

	private String birthday;

	private byte creditScore;

	private SmallAccount smallAccount;
}
