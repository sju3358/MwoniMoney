package com.ntt.mwonimoney.domain.account.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NHOpenVirtualAccountResponse {
    @JsonProperty("Header")
    private NHApiResponseHeader responseHeader;
    @JsonProperty("Dpnm")
    private String Dpnm;
    @JsonProperty("VractPrtn")
    private String VractPrtn;
    @JsonProperty("Vran")
    private String Vran;
    @JsonProperty("IsncRmngCnt")
    private int IsncRmngCnt;
    @JsonProperty("IsncFncnt")
    private int IsncFncnt;
}
