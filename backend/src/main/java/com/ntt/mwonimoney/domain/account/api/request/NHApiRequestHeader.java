package com.ntt.mwonimoney.domain.account.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
public class NHApiRequestHeader {
    @JsonProperty("ApiNm")
    private String ApiNm;
    @JsonProperty("Tsymd")
    private String Tsymd; // YYYYMMDD
    @JsonProperty("Trtm")
    private String Trtm; // HHMMSS
    @JsonProperty("Iscd")
    private String Iscd = "002064";
    @JsonProperty("FintechApsno")
    private String FintechApsno = "001";
    @JsonProperty("ApiSvcCd")
    private String ApiSvcCd = "DrawingTransferA";
    @JsonProperty("IsTuno")
    private String IsTuno;
    @JsonProperty("AccessToken")
    private String AccessToken = "6a35a489bf2259094fd2f22349c191544e762853bf2807ad31aec559bcf41477";

    @Builder
    public NHApiRequestHeader(String ApiNm, String IsTuno){
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        this.ApiNm = ApiNm;
        this.Tsymd = currentDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.Trtm = currentTime.format(DateTimeFormatter.ofPattern("HHmmss"));
        this.IsTuno = IsTuno;
    }
}
