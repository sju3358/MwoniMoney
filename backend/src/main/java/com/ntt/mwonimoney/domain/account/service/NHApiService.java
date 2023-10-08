package com.ntt.mwonimoney.domain.account.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ntt.mwonimoney.domain.account.api.request.NHApiCheckOpenFinAccountDirectRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiDrawingTransferRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiOpenFinAccountDirectRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiReceivedTransferAccountNumberRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHOpenVirtualAccountRequest;
import com.ntt.mwonimoney.domain.account.api.response.NHApiCheckOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiDrawingTransferResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiReceivedTransferAccountNumberResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHOpenVirtualAccountResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NHApiService {

	private final RestTemplate restTemplate;

	public NHApiOpenFinAccountDirectResponse getCheckOpenFinAccountDirect(
		NHApiOpenFinAccountDirectRequest openFinAccountDirectRequest) {
		String openFinAccountDirectUrl = "https://developers.nonghyup.com/OpenFinAccountDirect.nh";

		HttpHeaders headers = new HttpHeaders();
		headers.set("accept", "application/json");
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<NHApiOpenFinAccountDirectRequest> requestEntity = new HttpEntity<>(openFinAccountDirectRequest,
			headers);
		ResponseEntity<NHApiOpenFinAccountDirectResponse> response = restTemplate.exchange(openFinAccountDirectUrl,
			HttpMethod.POST, requestEntity, NHApiOpenFinAccountDirectResponse.class);
		NHApiOpenFinAccountDirectResponse openFinAccountDirectResponse = response.getBody();

		return openFinAccountDirectResponse;
	}

	public NHApiCheckOpenFinAccountDirectResponse getcheckOpenFinAccountDirect(
		NHApiCheckOpenFinAccountDirectRequest checkOpenFinAccountDirectRequest) {
		String checkOpenFinAccountDirectUrl = "https://developers.nonghyup.com/CheckOpenFinAccountDirect.nh";

		HttpHeaders headers = new HttpHeaders();
		headers.set("accept", "application/json");
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<NHApiCheckOpenFinAccountDirectRequest> requestEntity = new HttpEntity<>(
			checkOpenFinAccountDirectRequest, headers);
		ResponseEntity<NHApiCheckOpenFinAccountDirectResponse> response = restTemplate.exchange(
			checkOpenFinAccountDirectUrl, HttpMethod.POST, requestEntity, NHApiCheckOpenFinAccountDirectResponse.class);
		NHApiCheckOpenFinAccountDirectResponse checkOpenFinAccountDirectResponses = response.getBody();

		return checkOpenFinAccountDirectResponses;
	}

	public NHOpenVirtualAccountResponse getOpenVirtualAccount(NHOpenVirtualAccountRequest openVirtualAccountRequest) {
		String openVirtualAccountUrl = "https://developers.nonghyup.com/OpenVirtualAccount.nh";

		HttpHeaders headers = new HttpHeaders();
		headers.set("accept", "application/json");
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<NHOpenVirtualAccountRequest> requestEntity = new HttpEntity<>(openVirtualAccountRequest, headers);
		ResponseEntity<NHOpenVirtualAccountResponse> response = restTemplate.exchange(openVirtualAccountUrl,
			HttpMethod.POST, requestEntity, NHOpenVirtualAccountResponse.class);
		NHOpenVirtualAccountResponse openVirtualAccountResponse = response.getBody();

		return openVirtualAccountResponse;
	}

	public void transfer(NHApiDrawingTransferRequest drawingTransferRequest,
		NHApiReceivedTransferAccountNumberRequest receivedTransferAccountNumberRequest) {
		String drawingTransferUrl = "https://developers.nonghyup.com/DrawingTransfer.nh";

		HttpHeaders headers = new HttpHeaders();
		headers.set("accept", "application/json");
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<NHApiDrawingTransferRequest> drawingTransferRequestHttpEntity = new HttpEntity<>(
			drawingTransferRequest, headers);
		ResponseEntity<NHApiDrawingTransferResponse> drawingTransferResponseResponseEntity = restTemplate.exchange(
			drawingTransferUrl, HttpMethod.POST, drawingTransferRequestHttpEntity, NHApiDrawingTransferResponse.class);
		NHApiDrawingTransferResponse drawingTransferResponse = drawingTransferResponseResponseEntity.getBody();

		String receivedTransferAccountNumberUrl = "https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh";

		HttpEntity<NHApiReceivedTransferAccountNumberRequest> receivedTransferAccountNumberRequestHttpEntity = new HttpEntity<>(
			receivedTransferAccountNumberRequest, headers);
		ResponseEntity<NHApiReceivedTransferAccountNumberResponse> receivedTransferAccountNumberResponseResponseEntity
			= restTemplate.exchange(receivedTransferAccountNumberUrl, HttpMethod.POST,
			receivedTransferAccountNumberRequestHttpEntity, NHApiReceivedTransferAccountNumberResponse.class);
		NHApiReceivedTransferAccountNumberResponse receivedTransferAccountNumberResponse = receivedTransferAccountNumberResponseResponseEntity.getBody();

	}

	public String istunoGenerator() {
		return Integer.toString((int)(Math.random() * 100000000));
	}

}
