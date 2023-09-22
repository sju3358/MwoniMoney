package com.ntt.mwonimoney.global.fcm.service;

import com.ntt.mwonimoney.global.fcm.api.request.FCMTokenRequest;

public interface FCMService {
	void updateFCMToken(FCMTokenRequest fcmTokenRequest);
}
