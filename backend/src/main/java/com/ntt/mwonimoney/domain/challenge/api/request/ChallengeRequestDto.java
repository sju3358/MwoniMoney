package com.ntt.mwonimoney.domain.challenge.api.request;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChallengeRequestDto {
	private String childUuid;

	//challenge내용
	private String title;
	private String category;

	//challengeMember내용
	private String memo;
	private int reward;
	private int status;
	private LocalDateTime endTime;
}
