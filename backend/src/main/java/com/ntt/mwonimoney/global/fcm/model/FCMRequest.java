package com.ntt.mwonimoney.global.fcm.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FCMRequest {
	Long memberIdx;
	String title;
	String content;
}
