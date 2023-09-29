package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VirtualAccountReceivedInquiry {
    private String Sqno;
    private String Vran;
    private MnrcSttsType MnrcStts;
    private String MnrcDt;
    private String Mntmd;
    private String MnChkTm;
    private int MnrcAmt;
}
