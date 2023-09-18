package com.ntt.mwonimoney.domain.challenge.api.response;

import java.time.LocalDateTime;

import com.ntt.mwonimoney.domain.challenge.entity.MemberChallenge;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberChallengeResponseDto {
	private Long memberChallengeIdx;
	private Integer challengeIdx;
	private Long memberIdx;
	private String memo;
	private int reward;
	private int status;
	private LocalDateTime endTime;
	private LocalDateTime createdTime;

	@Builder
	public MemberChallengeResponseDto(Long memberChallengeIdx, Integer challengeIdx, Long memberIdx,
		String memo, int reward, int status, LocalDateTime endTime, LocalDateTime createdTime) {
		this.memberChallengeIdx = memberChallengeIdx;
		this.challengeIdx = challengeIdx;
		this.memberIdx = memberIdx;
		this.memo = memo;
		this.reward = reward;
		this.status = status;
		this.endTime = endTime;
		this.createdTime = createdTime;
	}

	public MemberChallengeResponseDto(MemberChallenge memberChallenge) {
		this.memberChallengeIdx = memberChallenge.getMemberChallengeIdx();
		this.challengeIdx = memberChallenge.getChallenge().getChallengeIdx();
		this.memberIdx = memberChallenge.getMember().getIdx();
		this.memo = memberChallenge.getMemo();
		this.reward = memberChallenge.getReward();
		this.status = memberChallenge.getStatus();
		this.endTime = memberChallenge.getEndTime();
		this.createdTime = memberChallenge.getCreateTime();
	}
}
