package com.ntt.mwonimoney.domain.account.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.JoinColumn;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class NHApiCheckOpenFinAccountDirectRequest {
    @JsonProperty("Header")
    private NHApiRequestHeader requestHeader;
    @JsonProperty("Rgno")
    private String Rgno;
    @JsonProperty("BrdtBrno")
    private String BrdtBmo; /// YYYYMMDD
}
