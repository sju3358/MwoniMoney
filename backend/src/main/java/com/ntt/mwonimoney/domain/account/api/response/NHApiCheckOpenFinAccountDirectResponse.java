package com.ntt.mwonimoney.domain.account.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NHApiCheckOpenFinAccountDirectResponse {
    @JsonProperty("Header")
    private NHApiResponseHeader responseHeader;
    @JsonProperty("FinAcno")
    private String FinAcno;
    @JsonProperty("RgsnYmd")
    private String RgsnYmd;
}
