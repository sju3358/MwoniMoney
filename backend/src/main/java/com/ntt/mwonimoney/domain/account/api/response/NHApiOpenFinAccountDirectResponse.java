package com.ntt.mwonimoney.domain.account.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ntt.mwonimoney.domain.account.api.request.NHApiRequestHeader;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NHApiOpenFinAccountDirectResponse {
    @JsonProperty("Header")
    private NHApiRequestHeader requestHeader;
    @JsonProperty("Rgno")
    private String Rgno;
}
