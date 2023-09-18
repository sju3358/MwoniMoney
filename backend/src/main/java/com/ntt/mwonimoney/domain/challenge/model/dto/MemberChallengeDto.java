package com.ntt.mwonimoney.domain.challenge.model.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class MemberChallengeDto {

	private String memo;
	private int reward;
	private int status;
	private LocalDateTime endTime;

	public MemberChallengeDto(String memo, int reward, int status, LocalDateTime endTime) {
		this.memo = memo;
		this.reward = reward;
		this.status = status;
		this.endTime = endTime;
	}
}
