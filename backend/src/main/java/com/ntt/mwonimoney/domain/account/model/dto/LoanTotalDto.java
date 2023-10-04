package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoanTotalDto {
	private Long totalAmount;
	private Long totalInterest;
	private Long totalBalance;
	private Double avgInterest;
}
