package com.ntt.mwonimoney.domain.account.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PageToScroll {
    private int page;
    private int size;
}
