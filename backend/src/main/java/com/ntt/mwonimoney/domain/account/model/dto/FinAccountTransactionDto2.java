package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class FinAccountTransactionDto2 {

    private int money;

    private int balance;

    private String memo;

    private LocalDateTime time;

}
