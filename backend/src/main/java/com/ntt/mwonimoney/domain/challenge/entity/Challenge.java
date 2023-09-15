package com.ntt.mwonimoney.domain.challenge.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
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