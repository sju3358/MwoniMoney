package com.ntt.wannabee.domain.member.entity.challenge;

import java.time.LocalDateTime;

import com.ntt.wannabee.domain.member.entity.BaseEntity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;

public class MemberChallenge extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer memberChallengeIdx;

	//private Challenge challenge;

	//복합키 설정 코드 필요

	private String memo;

	private int reward;

	private int status;

	private LocalDateTime endTime;

	//생성자
	@Builder
	public MemberChallenge(String memo, int reward, int status, LocalDateTime endTime) {
		this.memo = memo;
		this.reward = reward;
		this.status = status;
		this.endTime = endTime;
	}

}
