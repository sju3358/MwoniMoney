package com.ntt.mwonimoney.domain.account.model.dtoV2;

import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionListRequestType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GetTransactionRequestDto {
    FinAccountTransactionListRequestType type;
    FinAccountType finAccountType;
    String childUUID;
}
