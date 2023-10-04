package com.ntt.mwonimoney.domain.challenge.service;

import java.util.List;

import com.ntt.mwonimoney.domain.challenge.api.request.ChallengeRequestDto;
import com.ntt.mwonimoney.domain.challenge.api.response.MemberChallengeResponseDto;

public interface ChallengeService {

	MemberChallengeResponseDto writeChallenge(ChallengeRequestDto challengeRequestDto, Long childIdx);

	void deleteChallenge(Long memberChallengeIdx);

	void completeChallenge(Long memberChallengeIdx);

	void rejectChallenge(Long memberChallengeIdx);

	void acceptChallenge(Long memberChallengeIdx);

	MemberChallengeResponseDto proposeChallenge(ChallengeRequestDto challengeRequestDto, Long childIdx);

	void proposeAcceptChallenge(Long memberChallengeIdx);

	List<MemberChallengeResponseDto> selectMemberChallenge(Integer status, Long memberIdx);

}
