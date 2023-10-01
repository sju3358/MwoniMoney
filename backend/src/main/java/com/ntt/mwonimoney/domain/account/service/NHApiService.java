package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.api.request.*;
import com.ntt.mwonimoney.domain.account.api.response.NHApiCheckOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHOpenVirtualAccountResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class NHApiService {

    private final RestTemplate restTemplate;

    public NHApiOpenFinAccountDirectResponse getCheckOpenFinAccountDirect(NHApiOpenFinAccountDirectRequest openFinAccountDirectRequest) {
        String openFinAccountDirectUrl = "https://developers.nonghyup.com/OpenFinAccountDirect.nh";

        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<NHApiOpenFinAccountDirectRequest> requestEntity = new HttpEntity<>(openFinAccountDirectRequest, headers);
        ResponseEntity<NHApiOpenFinAccountDirectResponse> response = restTemplate.exchange(openFinAccountDirectUrl, HttpMethod.POST, requestEntity, NHApiOpenFinAccountDirectResponse.class);
        NHApiOpenFinAccountDirectResponse openFinAccountDirectResponse = response.getBody();

        return openFinAccountDirectResponse;
    }

    public NHApiCheckOpenFinAccountDirectResponse getcheckOpenFinAccountDirect(NHApiCheckOpenFinAccountDirectRequest checkOpenFinAccountDirectRequest) {
        String checkOpenFinAccountDirectUrl = "https://developers.nonghyup.com/CheckOpenFinAccountDirect.nh";

        HttpHeaders headers = new HttpHeaders();
        headers.set("accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<NHApiCheckOpenFinAccountDirectRequest> requestEntity = new HttpEntity<>(checkOpenFinAccountDirectRequest, headers);
        ResponseEntity<NHApiCheckOpenFinAccountDirectResponse> response = restTemplate.exchange(checkOpenFinAccountDirectUrl, HttpMethod.POST, requestEntity, NHApiCheckOpenFinAccountDirectResponse.class);
        NHApiCheckOpenFinAccountDirectResponse checkOpenFinAccountDirectResponses = response.getBody();

        return checkOpenFinAccountDirectResponses;
    }

    public NHOpenVirtualAccountResponse getOpenVirtualAccount(NHOpenVirtualAccountRequest openVirtualAccountRequest) {
        return null;
    }

    public void transfer(NHApiDrawingTransferRequest drawingTransferRequest, NHApiReceivedTransferAccountNumberRequest receivedTransferAccountNumberRequest) {
    }

    public String istunoGenerator(){
        return Integer.toString((int)(Math.random()*100000000));
    }
}
