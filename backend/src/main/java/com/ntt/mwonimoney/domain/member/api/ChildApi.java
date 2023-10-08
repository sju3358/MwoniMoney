package com.ntt.mwonimoney.domain.member.api;

import java.time.LocalDateTime;

import javax.security.sasl.AuthenticationException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.member.api.request.ChangeRegularAllowanceRequest;
import com.ntt.mwonimoney.domain.member.api.request.EditRewardRemainRequest;
import com.ntt.mwonimoney.domain.member.api.request.EditRewardRequest;
import com.ntt.mwonimoney.domain.member.service.ChildService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.util.S3Manager;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Slf4j
public class ChildApi {

	private final ChildService childService;
	private final MemberAuthService memberAuthService;
	private final JwtTokenProvider jwtTokenProvider;
	private final S3Manager s3Manager;

	@PostMapping("/members/reward")
	public ResponseEntity editChildRewardRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestBody EditRewardRequest request) {

		log.info("[자녀 리워드 변경 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		childService.checkParent(memberUUID, request.getChildUUID());

		childService.editQuizReward(request.getChildUUID(), request.getReward());

		log.info("[자녀 리워드 변경 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().body(request.getReward());
	}

	@PostMapping("/members/rewardRemain")
	public ResponseEntity editChildRewardRemainRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestBody EditRewardRemainRequest request) throws AuthenticationException {

		log.info("[자녀 리워드 한도 변경 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		childService.checkParent(memberUUID, request.getChildUUID());

		childService.editQuizRewardRemain(request.getChildUUID(), request.getRewardRemain());

		log.info("[자녀 리워드 한도 변경 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().body(request.getRewardRemain());
	}

	@PatchMapping("/members/regularAllowance")
	public ResponseEntity changeChildRegularAllowance(@RequestParam("childUUID") String childUUID, @RequestBody
	ChangeRegularAllowanceRequest changeRegularAllowanceRequest) {
		log.info("[자녀 정기 용돈 변경 요청 시작]", LocalDateTime.now());

		childService.changeRegularAllowance(childUUID, changeRegularAllowanceRequest.getRegularAllowance(),
			changeRegularAllowanceRequest.getRegularAllowanceDay());

		log.info("[자녀 정기 용돈 변경 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();
	}

}
