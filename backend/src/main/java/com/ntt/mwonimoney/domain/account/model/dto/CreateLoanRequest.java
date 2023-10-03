package com.ntt.mwonimoney.domain.account.model.dto;

import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class CreateLoanRequest {
    private String borrowerUUID;
    private LoanStatus status;
    private String name;
    private String content;
    private int amount;
    private LocalDateTime deadline;
    private Double rate;
}
