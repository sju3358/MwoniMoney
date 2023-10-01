package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.*;

@Getter
@Setter
@Builder
public class FinAccountTransferRequest {
    private Long receiverIdx;
    private int price;
    private String senderContent; // 출금계좌 내용
    private String receiverContent; // 입금계좌 내용
}
