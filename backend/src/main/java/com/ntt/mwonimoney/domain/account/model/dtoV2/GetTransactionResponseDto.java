package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class GetTransactionResponseDto {

    private List<FinAccountTransactionDto2> FinAccountTransactionDto2;

    private Long totalPlus;

    private Long totalMinus;

}
