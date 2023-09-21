package com.ntt.mwonimoney.domain.fcm.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FCMRequestDto {
	Long memberIdx;
	String title;
	String content;
}
