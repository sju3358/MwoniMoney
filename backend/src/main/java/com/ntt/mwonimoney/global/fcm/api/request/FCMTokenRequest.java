package com.ntt.mwonimoney.global.fcm.api.request;

import lombok.Getter;

@Getter
public class FCMTokenRequest {
	private String userUUID;
	private String firebaseToken;
}
