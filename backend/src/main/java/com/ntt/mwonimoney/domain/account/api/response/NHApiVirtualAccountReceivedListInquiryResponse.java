package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class NHApiVirtualAccountReceivedListInquiryResponse {
    private NHApiResponseHeader responseHeader;
    private int TotCnt;
    private int IqtCnt;
    private int PageNo;
    @Builder.Default
    private List<VirtualAccountReceivedInquiry> REC = new ArrayList<>();
}
