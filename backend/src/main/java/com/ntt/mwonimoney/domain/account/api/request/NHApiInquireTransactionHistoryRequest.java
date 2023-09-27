package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiInquireTransactionHistoryRequest {
    private NHApiRequestHeader requestHeader;
    private BncdType Bncd;
    private String Acno;
    private String Insymd;
    private String Ineymd;
    private TrnsDsncType TrnsDsnc = TrnsDsncType.A;
    private LnsqType Lnsq = LnsqType.ASC;
    private int PageNo = 1;
    private int Dmcnt;
}
