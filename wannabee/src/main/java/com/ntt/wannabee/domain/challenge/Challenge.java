package com.ntt.wannabee.domain.challenge;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;

public class Challenge {
	@Id
	@GeneratedValue
	private Integer challengeIdx;

	private String title;

	private String category;

	//생성자
	@Builder
	public Challenge(String title, String category) {
		this.title = title;
		this.category = category;
	}
}
