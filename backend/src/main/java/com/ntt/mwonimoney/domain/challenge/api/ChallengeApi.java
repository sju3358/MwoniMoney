package com.ntt.mwonimoney.domain.challenge.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.challenge.api.request.ChallengeRequestDto;
import com.ntt.mwonimoney.domain.challenge.api.response.MemberChallengeResponseDto;
import com.ntt.mwonimoney.domain.challenge.service.ChallengeService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Slf4j
public class ChallengeApi {

	private final JwtTokenProvider jwtTokenProvider;
	private final MemberAuthService memberAuthService;
	private final ChallengeService challengeService;

	/**
	 * 부모
	 */
	//부모님이 챌린지 생성
	@PostMapping("/challenges")
	public ResponseEntity writeChallenge(
		@RequestHeader("Authorization") String accessToken,
		@RequestBody ChallengeRequestDto challengeRequestDto) {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long parentIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
		Long childIdx = memberAuthService.getMemberAuthInfo(challengeRequestDto.getChildUuid()).getMemberIdx();

		MemberChallengeResponseDto responseData = challengeService.writeChallenge(challengeRequestDto, parentIdx,
			childIdx);

		return ResponseEntity.ok().body(responseData);
	}

	//부모 챌린지 삭제
	@DeleteMapping("/challenges/{memberChallengeIdx}")
	public ResponseEntity deleteChallenge(@RequestHeader("Authorization") String accessToken,
		@PathVariable Long memberChallengeIdx) {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long parentIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		challengeService.deleteChallenge(parentIdx, memberChallengeIdx);
		return ResponseEntity.ok().build();
	}

	//부모 챌린지 완료
	@PatchMapping("/challenges/{memberChallengeIdx}")
	public ResponseEntity CompleteChallenge(@RequestHeader("Authorization") String accessToken,
		@PathVariable Long memberChallengeIdx) {
		challengeService.completeChallenge(memberChallengeIdx);

		return ResponseEntity.ok().build();
	}

	//부모 챌린지 거절
	@PatchMapping("/challenges/{memberChallengeIdx}/reject")
	public ResponseEntity RejectChallenge(@RequestHeader("Authorization") String accessToken,
		@PathVariable Long memberChallengeIdx) {
		challengeService.rejectChallenge(memberChallengeIdx);

		return ResponseEntity.ok().build();
	}

	//부모 챌린지 승인
	@PatchMapping("/challenges/{memberChallengeIdx}/accept")
	public ResponseEntity AcceptChallenge(@RequestHeader("Authorization") String accessToken,
		@PathVariable Long memberChallengeIdx) {
		challengeService.acceptChallenge(memberChallengeIdx);

		return ResponseEntity.ok().build();
	}

	/**
	 * 자식
	 */
	//자식 챌린지 생성 요청
	@PostMapping("/challenges/propose")
	public ResponseEntity ProposeChallenge(@RequestHeader("Authorization") String accessToken,
		@RequestBody ChallengeRequestDto challengeRequestDto) {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long parentIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
		Long childIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		MemberChallengeResponseDto responseData = challengeService.proposeChallenge(challengeRequestDto, parentIdx,
			childIdx);
		log.info("responseData : {}", responseData);

		return ResponseEntity.ok().body(responseData);
	}

	//자식 챌린지 완료 요청
	@PatchMapping("/challenges/propose/{memberChallengeIdx}")
	public ResponseEntity ProposeAcceptChallenge(@RequestHeader("Authorization") String accessToken,
		@PathVariable Long memberChallengeIdx) {
		challengeService.proposeAcceptChallenge(memberChallengeIdx);

		return ResponseEntity.ok().build();
	}

	//공통
	//부모 자식 챌린지 조회
	@GetMapping("/challenges")
	public ResponseEntity SelectMemberChallenge(@RequestHeader("Authorization") String accessToken,
		@RequestParam(name = "status") Integer status, @RequestParam(name = "extramemberUuid") String extramemberUuid) {
		Long memberIdx;
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		if (extramemberUuid.equals("none")) {
			//accessToken은 자식꺼, extramemberUuid == none
			memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
			log.info("memberIdx : {}", memberIdx);
		} else {
			//accessToken은 부모꺼, extramemberUuid == 자식Uuid
			memberIdx = memberAuthService.getMemberAuthInfo(extramemberUuid)
				.getMemberIdx();
		}

		log.info("서비스 시작");
		List<MemberChallengeResponseDto> responseData = challengeService.selectMemberChallenge(
			status, memberIdx);
		log.info("서비스 끝");
		return ResponseEntity.ok().body(responseData);
	}
}
