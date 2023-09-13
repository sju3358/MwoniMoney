package com.ntt.wannabee.domain.member.model.dto;

import com.ntt.wannabee.domain.member.model.vo.SmallAccount;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ChildDto extends MemberDto {

	private String birthday;

	private byte creditScore;

	private SmallAccount smallAccount;
}
