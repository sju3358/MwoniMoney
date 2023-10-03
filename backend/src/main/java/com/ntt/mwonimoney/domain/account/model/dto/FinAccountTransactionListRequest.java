package com.ntt.mwonimoney.domain.account.model.dto;

import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class FinAccountTransactionListRequest {
    FinAccountTransactionListRequestType type;
    FinAccountType finAccountType;
}
