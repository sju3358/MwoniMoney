package com.ntt.mwonimoney.domain.challenge.entity;

import java.time.LocalDateTime;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class MemberChallenge extends CommonEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_challenge_idx")
	private Integer memberChallengeIdx;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "challenge_idx")
	private Challenge challenge;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_idx")
	private Member member;

	@Column(name = "challenge_memo")
	private String memo;

	@Column(name = "challenge_reward")
	private int reward;

	@Column(name = "challenge_status")
	private int status;

	@Column(name = "challenge_end_time")
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
