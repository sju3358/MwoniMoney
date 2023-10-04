package com.ntt.mwonimoney.domain.member.api.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SmallAccountRequest {
	private int goalMoney;
	private String goalName;
	private int saveRatio;
}
