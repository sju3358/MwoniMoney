package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class NHApiVirtualAccountReceivedListInquiryResponse {
    private NHApiResponseHeader responseHeader;
    private int TotCnt;
    private int IqtCnt;
    private int PageNo;
    private List<VirtualAccountReceivedInquiry> REC = new ArrayList<>();
}
