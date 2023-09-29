package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiDrawingTransferResponse {
    private NHApiResponseHeader responseHeader;
    private String FinAcno;
    private String RgsnYmd;
}
