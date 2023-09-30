package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiOpenFinAccountDirectRequest {
    private NHApiRequestHeader requestHeader;
    private DrtrRgynStatus DrtrRgyn;
    private String BrdtBmo; // YYYYMMDD
    private BncdType Bncd;
    private String Acno;
}
