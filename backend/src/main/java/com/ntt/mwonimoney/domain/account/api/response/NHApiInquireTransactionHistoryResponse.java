package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class NHApiInquireTransactionHistoryResponse {
    private NHApiResponseHeader responseHeader;
    private CtntDataYnType CtntDataYn;
    private int TotCnt;
    private int Iqtcnt;
    private List<NHApiTransactionHistory> transactionHistories = new ArrayList<>();
}
