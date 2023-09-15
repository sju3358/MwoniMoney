package com.ntt.mwonimoney.domain.challenge.model.dto;

import lombok.Data;

@Data
public class ChallengeDto {
	private String title;

	private String category;

	public ChallengeDto(String title, String category) {
		this.title = title;
		this.category = category;
	}
}
