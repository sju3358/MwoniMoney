package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiPaymentPayoutAccountTransferRequest {
    private NHApiRequestHeader requestHeader;
    private int Tram;
    private String Acno;
}
