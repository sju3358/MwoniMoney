package com.ntt.mwonimoney.domain.account.api.response;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NHApiTransactionHistory {
    private String Trdd;
    private String Txtm;
    private MnrcDrotDsncType MnrcDrotDsnc;
    private String Tram;
    private String AftrBlnc;
    private String TrnsAfAcntBlncSmblCd;
    private String Smr;
    private String HnisCd;
    private String HnbrCd;
    private CcynType Ccyn;
    private String Tuno;
    private String BnprCntn;
}
