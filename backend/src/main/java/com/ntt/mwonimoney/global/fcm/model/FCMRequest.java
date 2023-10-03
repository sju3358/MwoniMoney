package com.ntt.mwonimoney.global.fcm.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FCMRequest {
	String memberUuid;
	String title;
	String content;
}
