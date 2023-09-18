package com.ntt.mwonimoney.domain.challenge.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberChallengeRequestDto {
	private Integer status;
	private String extramemberUuid; //만약에 부모가 조회요청을 날리면 여기에 childUuid가 들어감.

	@Builder
	public MemberChallengeRequestDto(Integer status, String extramemberUuid) {
		this.status = status;
		this.extramemberUuid = extramemberUuid;
	}
}
