package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiCheckOpenFinAccountDirectRequest {
    private NHApiRequestHeader requestHeader;
    private String Rgno;
    private String BrdtBmo; /// YYYYMMDD
}
