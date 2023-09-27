package com.ntt.mwonimoney.domain.account.api.response;

import com.ntt.mwonimoney.domain.account.api.request.NHApiRequestHeader;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiOpenFinAccountDirectResponse {
    private NHApiRequestHeader requestHeader;
    private String Rgno;
}
