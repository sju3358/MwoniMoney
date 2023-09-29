package com.ntt.mwonimoney.domain.account.api.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@Builder
public class NHApiResponseHeader {
    private String ApiNm;
    private String Tsymd; // YYYYMMDD
    private String Trtm; // HHMMSS
    private String Iscd;
    private String FintechApsno;
    private String APISvcCd;
    private String Istuno;
    private String Rpcd;
    private String Rsms;
}
