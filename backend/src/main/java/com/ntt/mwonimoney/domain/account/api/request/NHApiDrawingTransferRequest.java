package com.ntt.mwonimoney.domain.account.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiDrawingTransferRequest {
    @JsonProperty("Header")
    private NHApiRequestHeader requestHeader;
    @JsonProperty("FinAcno")
    private String FinAcno;
    @JsonProperty("Tram")
    private String Tram;
    @JsonProperty("DractOtlt")
    private String DractOtlt;
    @JsonProperty("MractOtlt")
    private String MractOtlt;
}
