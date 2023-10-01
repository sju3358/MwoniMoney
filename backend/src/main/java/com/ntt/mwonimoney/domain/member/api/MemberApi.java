package com.ntt.mwonimoney.domain.member.api;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.member.api.request.ChangeMemberRoleRequest;
import com.ntt.mwonimoney.domain.member.api.request.MemberInfoChangeRequest;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1")
public class MemberApi {

	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberAuthService memberAuthService;

	@GetMapping("/members")
	public ResponseEntity getMemberInfoRequest(
		@RequestHeader("Authorization") String accessToken) {

		log.info("[멤버 조회 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		MemberDto responseData = memberService.getMemberInfo(memberIdx);

		log.info("[멤버 조회 요청 끝]", LocalDateTime.now());
		return ResponseEntity.ok().body(responseData);
	}

	@PatchMapping("/members")
	public ResponseEntity editMemberInfoRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestBody MemberInfoChangeRequest request) {

		log.error("[멤버 정보 변경 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		memberService.editMember(request, memberIdx);

		log.error("[멤버 정보 변경 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();

	}

	@PostMapping("/members/role")
	public ResponseEntity changeMemberRoleRequest(
		@RequestHeader("Authorization") String accessToken,
		@RequestBody ChangeMemberRoleRequest request) {

		log.info("멤버 역할 변경 요청 시작 : ", request.getMemberRole().name());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		memberService.changeMemberRole(memberUUID, request.getMemberRole());

		log.info("멤버 역할 변경 요청 끝");

		return ResponseEntity.ok().build();

	}
}
