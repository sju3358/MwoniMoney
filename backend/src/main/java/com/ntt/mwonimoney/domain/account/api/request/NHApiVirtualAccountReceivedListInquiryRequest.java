package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NHApiVirtualAccountReceivedListInquiryRequest {
    private NHApiRequestHeader requestHeader;
    private String Insymd;
    private String Ineymd;
    private String Vran;
    private LnsqType lnsqType;
    @Builder.Default
    private int PageNo = 1;
}
