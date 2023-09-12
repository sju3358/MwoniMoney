package com.ntt.wannabee.domain.account.dto;

import com.ntt.wannabee.domain.account.entity.FinAccountStatus;
import com.ntt.wannabee.domain.account.entity.FinAccountType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FinAccountDto {

	private Long idx;

	private String number;

	private FinAccountStatus status;

	private FinAccountType type;
}
