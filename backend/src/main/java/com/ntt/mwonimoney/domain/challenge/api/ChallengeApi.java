package com.ntt.mwonimoney.domain.challenge.api;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.challenge.api.request.ChallengeRequestDto;
import com.ntt.mwonimoney.domain.challenge.service.ChallengeService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.global.common.entity.BaseResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/challenges")
@Slf4j
public class ChallengeApi {

	private final MemberAuthService memberAuthService;
	private final MemberService memberService;

	private final ChallengeService challengeService;

	// 부모

	//부모님이 writechallenge
	@PostMapping("/")
	public BaseResponseDto writeChallenge(@CookieValue("memberUUID") String memberUUID,
		@RequestBody ChallengeRequestDto challengeRequestDto) {
		Long parentIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
		Long childIdx = memberAuthService.getMemberAuthInfo(challengeRequestDto.getChildUuid()).getMemberIdx();

		return challengeService.writeChallenge(challengeRequestDto, parentIdx, childIdx);
	}

	//부모 챌린지 삭제
	@DeleteMapping("/{memberChallengeIdx}")
	public BaseResponseDto deleteChallenge(@PathVariable Long memberChallengeIdx,
		@CookieValue("memberUUID") String memberUUID) {
		Long parentIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
		return challengeService.deleteChallenge(parentIdx, memberChallengeIdx);
	}

	//부모 챌린지 완료
	@PatchMapping("/{memberChallengeIdx}")
	public BaseResponseDto CompleteChallenge(@PathVariable Long memberChallengeIdx) {

		return challengeService.completeChallenge(memberChallengeIdx);
	}

	//부모 챌린지 거절
	@PatchMapping("/{memberChallengeIdx}/reject")
	public BaseResponseDto RejectChallenge(@PathVariable Long memberChallengeIdx) {
		return challengeService.rejectChallenge(memberChallengeIdx);
	}

	//부모 챌린지 승인
	@PatchMapping("/{memberChallengeIdx}/accept")
	public BaseResponseDto AcceptChallenge(@PathVariable Long memberChallengeIdx) {
		return challengeService.acceptChallenge(memberChallengeIdx);
	}

	//자식
	//자식 챌린지 생성 요청
	@PostMapping("/propose")
	public BaseResponseDto ProposeChallenge(@CookieValue("memberUUID") String memberUUID,
		@RequestBody ChallengeRequestDto challengeRequestDto) {
		Long parentIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
		Long childIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		return challengeService.proposeChallenge(challengeRequestDto, parentIdx, childIdx);
	}

	//자식 챌린지 완료 요청
	@PatchMapping("/propose/{memberChallengeIdx}")
	public BaseResponseDto ProposeAcceptChallenge(@PathVariable Long memberChallengeIdx) {
		return challengeService.proposeAcceptChallenge(memberChallengeIdx);
	}

	//공통
	//챌린지 조회
	// @GetMapping("/")
	// public List<MemberChallengeResponseDto> SelectMemberChallenge(@CookieValue("memberUUID") String memberUUID,
	// 	MemberChallengeRequestDto memberChallengeRequestDto) {
	// 	Long memberIdx;
	// 	if (memberChallengeRequestDto.getExtramemberUuid() == "none") {
	// 		//자식일때
	// 		memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
	// 	} else {
	// 		memberIdx = memberAuthService.getMemberAuthInfo(memberChallengeRequestDto.getExtramemberUuid())
	// 			.getMemberIdx();
	// 	}
	//
	// 	return challengeService.selectMemberChallenge(memberChallengeRequestDto, memberIdx);
	// }
}
