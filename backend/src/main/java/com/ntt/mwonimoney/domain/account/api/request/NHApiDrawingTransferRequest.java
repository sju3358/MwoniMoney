package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiDrawingTransferRequest {
    private NHApiRequestHeader requestHeader;
    private String FinAcno;
    private String Tram;
    private String DractOtlt;
    private String MractOtlt;
}
