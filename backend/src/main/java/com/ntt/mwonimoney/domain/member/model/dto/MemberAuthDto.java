package com.ntt.mwonimoney.domain.member.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberAuthDto {
	private String memberUUID;
	private Long memberIdx;
	private String memberRefreshToken;
}
