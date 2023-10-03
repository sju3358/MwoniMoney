package com.ntt.mwonimoney.domain.account.model.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FinAccountTransactionDto {

	private Long id;

	private int money;

	private int balance;

	private String memo;

	private LocalDateTime time;
}
