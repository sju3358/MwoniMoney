package com.ntt.mwonimoney.domain.challenge.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Challenge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "challenge_idx")
	private Integer challengeIdx;

	@Column(name = "challenge_title")
	private String title;

	@Column(name = "challenge_category")
	private String category;

	//생성자
	@Builder
	public Challenge(String title, String category) {
		this.title = title;
		this.category = category;
	}
}