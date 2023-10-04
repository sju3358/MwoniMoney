package com.ntt.mwonimoney.domain.account.api.v2;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ntt.mwonimoney.domain.account.service.SmallAccountService;
import com.ntt.mwonimoney.domain.member.api.request.SmallAccountRequest;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.service.ChildService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.util.S3Manager;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

@RestController(value = "SmallAccountApi")
@RequestMapping("/api/v2")
@Slf4j
public class SmallAccountApi {

	private final ChildService childService;
	private final MemberAuthService memberAuthService;
	private final JwtTokenProvider jwtTokenProvider;
	private final S3Manager s3Manager;
	private final SmallAccountService smallAccountService;

	@Autowired
	SmallAccountApi(
		ChildService childService,
		MemberAuthService memberAuthService,
		JwtTokenProvider jwtTokenProvider,
		S3Manager s3Manager,
		@Qualifier("SmallAccountServiceV2") SmallAccountService smallAccountService) {

		this.childService = childService;
		this.memberAuthService = memberAuthService;
		this.jwtTokenProvider = jwtTokenProvider;
		this.s3Manager = s3Manager;
		this.smallAccountService = smallAccountService;
	}

	@PostMapping("/accounts/small-account")
	public ResponseEntity openSmallAccountRequest(
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

		log.info("[짜금통 만들기 요청] 멤버 정보 INSERT 완료");

		smallAccountService.openSmallAccount(memberIdx, smallAccount);

		log.info("[짜금통 만들기 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/accounts/small-account")
	public ResponseEntity closeSmallAccountRequest(
		@RequestHeader("Authorization") String accessToken) {

		log.info("[짜금통 삭제 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		childService.deleteSmallAccountInfo(memberIdx);

		smallAccountService.closeSmallAccount(memberIdx);

		log.info("[짜금통 삭제 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();
	}

}
