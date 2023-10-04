package com.ntt.mwonimoney.domain.account.model.dto;

import com.ntt.mwonimoney.domain.account.entity.FinAccountType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FinAccountDto {

	private String finAcno;

	private FinAccountType type;

	private int remain;

}

