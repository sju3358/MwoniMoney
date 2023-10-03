package com.ntt.mwonimoney.domain.account.model.dto;

import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import lombok.*;

@Getter
@Setter
@Builder
public class LoanListRequestDto {
    private LoanListRequestStatus loanListRequestStatus;
    private LoanMemberType loanMemberType;
    private String childUUID;
}
