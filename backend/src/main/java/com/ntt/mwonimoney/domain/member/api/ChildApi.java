package com.ntt.mwonimoney.domain.member.api;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.security.sasl.AuthenticationException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ntt.mwonimoney.domain.member.api.request.EditRewardRemainRequest;
import com.ntt.mwonimoney.domain.member.api.request.EditRewardRequest;
import com.ntt.mwonimoney.domain.member.api.request.SmallAccountRequest;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.service.ChildService;
import com.ntt.mwonimoney.domain.member.service.ChildrenService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
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
	private final MemberService memberService;
	private final ChildrenService childrenService;
	private final JwtTokenProvider jwtTokenProvider;
	private final S3Manager s3Manager;

	@PostMapping("/members/small-account")
	public ResponseEntity makeSmallAccountRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestPart(value = "info") SmallAccountRequest request,
		@RequestPart(value = "image") MultipartFile file) throws IOException {

		log.info("[짜금통 만들기 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		String goalImageUrl = s3Manager.saveGoalImage(file)[1];
		SmallAccount smallAccount = childService.addSmallAccountInfo(
			memberIdx,
			request.getGoalMoney(),
			request.getGoalName(),
			goalImageUrl,
			request.getSaveRatio());

		log.info("[짜금통 만들기 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().body(smallAccount);

	}

	@DeleteMapping("/members/small-account")
	public ResponseEntity deleteSmallAccountRequest(
		@RequestHeader("Authorization") String accessToken) {

		log.info("[짜금통 삭제 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		childService.deleteSmallAccountInfo(memberIdx);

		log.info("[짜금통 삭제 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();
	}

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

}
