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
import com.ntt.mwonimoney.domain.challenge.repository.MemberChallengeRepository;
import com.ntt.mwonimoney.domain.challenge.service.ChallengeServiceImpl;
import com.ntt.mwonimoney.domain.member.entity.Parent;
import com.ntt.mwonimoney.domain.member.repository.ChildrenRepository;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.global.fcm.model.FCMRequest;
import com.ntt.mwonimoney.global.fcm.service.FCMService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Slf4j
public class ChallengeApi {

	private final JwtTokenProvider jwtTokenProvider;
	private final ChildrenRepository childrenRepository;
	private final MemberChallengeRepository memberChallengeRepository;
	private final MemberAuthService memberAuthService;
	private final ChallengeServiceImpl challengeServiceImpl;
	private final MemberService memberService;
	private final FCMService fcmService;

	/**
	 * 부모
	 */
	//부모님이 챌린지 생성
	@PostMapping("/challenges")
	public ResponseEntity writeChallenge(
		@RequestBody ChallengeRequestDto challengeRequestDto) {
		Long childIdx = memberService.getMemberIdx(challengeRequestDto.getChildUuid());

		MemberChallengeResponseDto responseData = challengeServiceImpl.writeChallenge(challengeRequestDto,
			childIdx);

		FCMRequest fcmRequest = FCMRequest.builder()
			.memberUuid(challengeRequestDto.getChildUuid())
			.title("챌린지 생성")
			.content("부모님께서 챌린지를 생성하셨어요")
			.build();

		fcmService.sendNotificationByToken(fcmRequest);

		return ResponseEntity.ok().body(responseData);
	}

	//부모 챌린지 삭제
	@DeleteMapping("/challenges/{memberChallengeIdx}")
	public ResponseEntity deleteChallenge(@PathVariable Long memberChallengeIdx) {
		challengeServiceImpl.deleteChallenge(memberChallengeIdx);

		return ResponseEntity.ok().build();
	}

	//부모 챌린지 완료
	@PatchMapping("/challenges/{memberChallengeIdx}")
	public ResponseEntity CompleteChallenge(@PathVariable Long memberChallengeIdx) {
		challengeServiceImpl.completeChallenge(memberChallengeIdx);

		String childUuid = memberChallengeRepository.findById(memberChallengeIdx).orElseThrow().getMember().getUuid();

		FCMRequest fcmRequest = FCMRequest.builder()
			.memberUuid(childUuid)
			.title("챌린지 완료")
			.content("부모님께서 챌린지를 완료하셨어요")
			.build();

		fcmService.sendNotificationByToken(fcmRequest);

		return ResponseEntity.ok().build();
	}

	//부모 챌린지 거절
	@PatchMapping("/challenges/{memberChallengeIdx}/reject")
	public ResponseEntity RejectChallenge(@PathVariable Long memberChallengeIdx) {
		challengeServiceImpl.rejectChallenge(memberChallengeIdx);

		return ResponseEntity.ok().build();
	}

	//부모 챌린지 승인
	@PatchMapping("/challenges/{memberChallengeIdx}/accept")
	public ResponseEntity AcceptChallenge(@PathVariable Long memberChallengeIdx) {
		challengeServiceImpl.acceptChallenge(memberChallengeIdx);

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

		Long childIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		MemberChallengeResponseDto responseData = challengeServiceImpl.proposeChallenge(challengeRequestDto,
			childIdx);
		log.info("responseData : {}", responseData);

		List<Parent> parents = childrenRepository.findParents(memberUUID);
		for (Parent parent : parents) {
			FCMRequest fcmRequest = FCMRequest.builder()
				.memberUuid(parent.getUuid())
				.title("챌린지 요청")
				.content("자녀가 챌린지 생성을 요청했어요")
				.build();

			fcmService.sendNotificationByToken(fcmRequest);
		}

		return ResponseEntity.ok().body(responseData);
	}

	//자식 챌린지 완료 요청
	@PatchMapping("/challenges/propose/{memberChallengeIdx}")
	public ResponseEntity ProposeAcceptChallenge(@RequestHeader("Authorization") String accessToken,
		@PathVariable Long memberChallengeIdx) {
		challengeServiceImpl.proposeAcceptChallenge(memberChallengeIdx);

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		List<Parent> parents = childrenRepository.findParents(memberUUID);
		for (Parent parent : parents) {
			FCMRequest fcmRequest = FCMRequest.builder()
				.memberUuid(parent.getUuid())
				.title("챌린지 완료")
				.content("자녀가 챌린지를 완료했어요")
				.build();

			fcmService.sendNotificationByToken(fcmRequest);
		}

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
			memberIdx = memberService.getMemberIdx(extramemberUuid);
		}

		log.info("서비스 시작");
		List<MemberChallengeResponseDto> responseData = challengeServiceImpl.selectMemberChallenge(
			status, memberIdx);
		log.info("서비스 끝");
		return ResponseEntity.ok().body(responseData);
	}
}


