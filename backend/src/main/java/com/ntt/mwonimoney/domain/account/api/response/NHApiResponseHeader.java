package com.ntt.mwonimoney.domain.account.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.JoinColumn;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
public class NHApiResponseHeader {
    @JsonProperty("ApiNm")
    private String ApiNm;
    @JsonProperty("Tsymd")
    private String Tsymd; // YYYYMMDD
    @JsonProperty("Trtm")
    private String Trtm; // HHMMSS
    @JsonProperty("Iscd")
    private String Iscd;
    @JsonProperty("FintechApsno")
    private String FintechApsno;
    @JsonProperty("APISvcCd")
    private String APISvcCd;
    @JsonProperty("Istuno")
    private String Istuno;
    @JsonProperty("Rpcd")
    private String Rpcd;
    @JsonProperty("Rsms")
    private String Rsms;
}
