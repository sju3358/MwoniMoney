package com.ntt.mwonimoney.domain.account.api.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class NHApiRequestHeader {
    private String ApiNm;
    private String Tsymd; // YYYYMMDD
    private String Trtm; // HHMMSS
    private String Iscd = "002064";
    private String FintechApsno = "001";
    private String APISvcCd = "DrawingTransferA";
    private String Istuno;
    private String AccessToken = "6a35a489bf2259094fd2f22349c191544e762853bf2807ad31aec559bcf41477";

    @Builder
    public NHApiRequestHeader(String ApiNm, String Istuno){
        LocalDate currentDate = LocalDate.now();
        this.ApiNm = ApiNm;
        this.Tsymd = currentDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        this.Trtm = currentDate.format(DateTimeFormatter.ofPattern("HHmmSS"));
        this.Istuno = Istuno;
    }
}
