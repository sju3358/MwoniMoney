package com.ntt.mwonimoney.domain.account.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiReceivedTransferAccountNumberRequest {
    @JsonProperty("Header")
    private NHApiRequestHeader requestHeader;
    private BncdType bncdType;
    private String Acno;
    private String Tram;
    private String DractOtlt;
    private String MractOtlt;
}
