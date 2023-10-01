package com.ntt.mwonimoney.domain.account.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiOpenFinAccountDirectRequest {
    @JsonProperty("Header")
    private NHApiRequestHeader requestHeader;
    @JsonProperty("DrtrRgyn")
    private DrtrRgynStatus DrtrRgyn;
    @JsonProperty("BrdtBrno")
    private String BrdtBmo; // YYYYMMDD
    @JsonProperty("Bncd")
    private String Bncd;
    @JsonProperty("Acno")
    private String Acno;
}
