package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoanTotalResponse {
	private Long totalAmount;
	private Long totalInterest;
	private Long totalBalance;
	private Double avgInterest;
}
