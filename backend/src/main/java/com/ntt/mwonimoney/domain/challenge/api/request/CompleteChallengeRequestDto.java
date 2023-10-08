package com.ntt.mwonimoney.domain.challenge.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CompleteChallengeRequestDto {
	String toUUID;
}
