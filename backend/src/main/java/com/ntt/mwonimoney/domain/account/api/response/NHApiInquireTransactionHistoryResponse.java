package com.ntt.mwonimoney.domain.account.api.response;

import java.util.ArrayList;
import java.util.List;

public class NHApiInquireTransactionHistoryResponse {
    private NHApiResponseHeader responseHeader;
    private CtntDataYnType CtntDataYn;
    private int TotCnt;
    private int Iqtcnt;
    private List<NHApiTransactionHistory> transactionHistories = new ArrayList<>();
}
