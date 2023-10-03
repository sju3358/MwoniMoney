package com.ntt.mwonimoney;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ntt.mwonimoney.domain.account.api.request.*;
import com.ntt.mwonimoney.domain.account.api.response.NHApiCheckOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.service.FinAccountService;
import com.ntt.mwonimoney.domain.account.service.NHApiService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
class WannabeeApplicationTests {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private NHApiService nhApiService;

	@Autowired
	private FinAccountService finAccountService;

	@Test
	void contextLoads() {

		NHApiRequestHeader openFinAccountDirectRequestHeader = NHApiRequestHeader.builder()
				.ApiNm("OpenFinAccountDirect")
				.IsTuno(nhApiService.istunoGenerator())
				.build();

		NHApiOpenFinAccountDirectRequest openFinAccountDirectRequest = NHApiOpenFinAccountDirectRequest.builder()
				.requestHeader(openFinAccountDirectRequestHeader)
				.DrtrRgyn(DrtrRgynStatus.Y)
//				.BrdtBmo(memberInfo.getBirthday().replace("-", ""))
				.BrdtBmo("19980813")
				.Bncd(BncdType.TYPE_011.getValue()) // 농협은행으로 고정
//				.Acno(accountNumber)
				.Acno("3020000008999")
				.build();

		// ObjectMapper를 사용하여 객체를 JSON으로 직렬화
		ObjectMapper objectMapper = new ObjectMapper();
		String json = null;
		try {
			json = objectMapper.writeValueAsString(openFinAccountDirectRequest);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		// JSON 출력
		System.out.println("변환 json: "+json);

		String openFinAccountDirectUrl = "https://developers.nonghyup.com/OpenFinAccountDirect.nh";

		HttpHeaders headers = new HttpHeaders();
		headers.set("accept", "application/json");
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<NHApiOpenFinAccountDirectRequest> requestEntity = new HttpEntity<>(openFinAccountDirectRequest, headers);
		ResponseEntity<NHApiOpenFinAccountDirectResponse> response = restTemplate.exchange(openFinAccountDirectUrl, HttpMethod.POST, requestEntity, NHApiOpenFinAccountDirectResponse.class);
		System.out.println("굿굿");
		System.out.println(response.getBody());

		
	}
	
//	@Test
	void test2(){
		NHApiRequestHeader openFinAccountDirectRequestHeader = NHApiRequestHeader.builder()
				.ApiNm("OpenFinAccountDirect")
				.IsTuno(nhApiService.istunoGenerator())
				.build();

		NHApiOpenFinAccountDirectRequest openFinAccountDirectRequest = NHApiOpenFinAccountDirectRequest.builder()
				.requestHeader(openFinAccountDirectRequestHeader)
				.DrtrRgyn(DrtrRgynStatus.Y)
//				.BrdtBmo(memberInfo.getBirthday().replace("-", ""))
				.BrdtBmo("19900112")
				.Bncd(BncdType.TYPE_011.getValue()) // 농협은행으로 고정
//				.Acno(accountNumber)
				.Acno("3020000008999")
				.build();

		NHApiOpenFinAccountDirectResponse openFinAccountDirectResponse = nhApiService.getCheckOpenFinAccountDirect(openFinAccountDirectRequest);
		System.out.println("openFinAccountDirectResponse = " + openFinAccountDirectResponse);
		System.out.println("등록번호: ");
		System.out.println("openFinAccountDirectResponse.getRgno() = " + openFinAccountDirectResponse.getRgno());
		
		// 2-2.NHDevelopers 핀어카운트(핀-어카운트 직접 발급 확인)
		NHApiRequestHeader checkOpenFinAccountDirectHeader = NHApiRequestHeader.builder()
				.ApiNm("CheckOpenFinAccountDirect")
				.IsTuno(nhApiService.istunoGenerator())
				.build();

		NHApiCheckOpenFinAccountDirectRequest checkOpenFinAccountDirectRequest = NHApiCheckOpenFinAccountDirectRequest.builder()
				.requestHeader(checkOpenFinAccountDirectHeader)
				.Rgno(openFinAccountDirectResponse.getRgno())
//                .BrdtBmo(memberInfo.getBirthday())
				.BrdtBmo("19980813")
				.build();

		NHApiCheckOpenFinAccountDirectResponse checkOpenFinAccountDirectResponse = nhApiService.getcheckOpenFinAccountDirect(checkOpenFinAccountDirectRequest);

		System.out.println("굿굿굿굿굿");
		System.out.println("checkOpenFinAccountDirectResponse = " + checkOpenFinAccountDirectResponse);
	}


}
