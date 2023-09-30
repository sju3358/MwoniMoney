package com.ntt.mwonimoney.domain.member.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditRewardRequest {
	private String childUUID;
	private int reward;
}
