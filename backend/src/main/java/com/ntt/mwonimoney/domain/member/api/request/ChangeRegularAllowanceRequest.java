package com.ntt.mwonimoney.domain.member.api.request;

import lombok.Data;

@Data
public class ChangeRegularAllowanceRequest {
	private int regularAllowance;
	private int regularAllowanceDay;
}
