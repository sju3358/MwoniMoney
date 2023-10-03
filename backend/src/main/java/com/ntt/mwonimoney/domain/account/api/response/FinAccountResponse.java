package com.ntt.mwonimoney.domain.account.api.response;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto;

import lombok.Data;

@Data
public class FinAccountResponse {
	private String number;
	private Long remain;
	private LocalDate createdDay;
	private String status;
	private List<FinAccountTransactionDto> finAccountTransactionDtos;

	public FinAccountResponse() {
		finAccountTransactionDtos = new ArrayList<>();
	}
}
