package com.ntt.mwonimoney.domain.member.entity;

import org.springframework.data.redis.core.RedisHash;

import com.ntt.mwonimoney.domain.member.model.dto.MemberAuthDto;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@RedisHash(value = "member_auth")
public class MemberAuth {

	@Id
	private String memberUUID;
	private Long memberIdx;
	private String memberRefreshToken;

	@Builder
	public MemberAuth(String memberUUID, Long memberIdx, String memberRefreshToken) {
		this.memberUUID = memberUUID;
		this.memberIdx = memberIdx;
		this.memberRefreshToken = memberRefreshToken;
	}

	public MemberAuthDto convertToDto() {
		return MemberAuthDto.builder()
			.memberUUID(memberUUID)
			.memberIdx(memberIdx)
			.memberRefreshToken(memberRefreshToken)
			.build();
	}
}
