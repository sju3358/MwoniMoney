package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NHApiDrawingTransferResponse {
    private NHApiResponseHeader responseHeader;
    private String FinAcno;
    private String RgsnYmd;
}
