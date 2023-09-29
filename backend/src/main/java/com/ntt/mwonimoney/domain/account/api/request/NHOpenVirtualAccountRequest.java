package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHOpenVirtualAccountRequest {
    private NHApiRequestHeader requestHeader;
    private String Dpnm;
}
