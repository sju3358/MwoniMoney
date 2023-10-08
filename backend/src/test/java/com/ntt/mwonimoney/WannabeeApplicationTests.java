package com.ntt.mwonimoney;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import com.ntt.mwonimoney.domain.account.service.NHApiService;
import com.ntt.mwonimoney.domain.account.service.v1.FinAccountServiceImpl;

@SpringBootTest
class WannabeeApplicationTests {

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private NHApiService nhApiService;

	@Autowired
	private FinAccountServiceImpl finAccountService;

	@Test
	void contextLoads() {

	}

}
