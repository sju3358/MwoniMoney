package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHOpenVirtualAccountResponse {
    private NHApiResponseHeader responseHeader;
    private String Dpnm;
    private String VractPrtn;
    private String Vran;
    private int IsncRmngCnt;
    private int IsncFncnt;
}
