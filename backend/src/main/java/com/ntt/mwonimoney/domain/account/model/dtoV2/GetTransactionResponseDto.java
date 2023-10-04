package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class GetTransactionResponseDto {

    private int money;

    private int balance;

    private String memo;

    private LocalDateTime time;

}
