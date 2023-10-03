package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FinAccountTransactionListRequest {
    PageToScroll pageToScroll;
    FinAccountTransactionListRequestType type;
}
