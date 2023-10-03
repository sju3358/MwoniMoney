package com.ntt.mwonimoney.global.fcm.service;

import com.ntt.mwonimoney.global.fcm.api.request.FCMTokenRequest;
import com.ntt.mwonimoney.global.fcm.model.FCMRequest;

public interface FCMService {
	void updateFCMToken(FCMTokenRequest fcmTokenRequest);

	void sendNotificationByToken(FCMRequest fcmRequest);
}
