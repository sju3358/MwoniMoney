package com.ntt.mwonimoney.global.fcm.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.global.fcm.api.request.FCMTokenRequest;
import com.ntt.mwonimoney.global.fcm.service.FCMServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FCMApi {
	private final FCMServiceImpl fcmServiceImpl;

	@PutMapping("/fcm")
	public ResponseEntity<?> updateFCMToken(@RequestBody FCMTokenRequest fcmTokenRequest) {
		log.info("test : {} ", fcmTokenRequest.getFirebaseToken());
		fcmServiceImpl.updateFCMToken(fcmTokenRequest);
		return ResponseEntity.ok().build();
	}
}
