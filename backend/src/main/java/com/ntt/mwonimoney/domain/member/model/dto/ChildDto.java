package com.ntt.mwonimoney.domain.member.model.dto;

import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ChildDto extends MemberDto {

	private byte creditScore;
	
	private SmallAccount smallAccount;

}
