package com.ntt.mwonimoney.domain.account.api.response;

import java.time.LocalDate;

import lombok.Data;

@Data
public class FinAccountResponse {
	private String number;
	private Long remain;
	private LocalDate createdDay;
	private String status;
}
