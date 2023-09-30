package com.ntt.mwonimoney.domain.member.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditRewardRemainRequest {
	private String childUUID;
	private int rewardRemain;
}
