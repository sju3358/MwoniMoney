package com.ntt.mwonimoney.global.common.entity;

import lombok.Builder;

public class BaseResponseDto {
	private boolean success;
	private String message;
	private Object data;

	@Builder
	public BaseResponseDto(boolean success, String message, Object data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
}

