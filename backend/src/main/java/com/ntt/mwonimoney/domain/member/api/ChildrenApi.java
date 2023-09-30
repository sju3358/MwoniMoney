package com.ntt.mwonimoney.domain.member.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;
import com.ntt.mwonimoney.domain.member.service.ChildrenService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ChildrenApi {

	private final ChildrenService childrenService;
	private final JwtTokenProvider jwtTokenProvider;

	@GetMapping("/children")
	public ResponseEntity<List<ChildDto>> getChildrenListRequest(
		@RequestHeader("Authorization") String accessToken) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		List<ChildDto> childDtoList = childrenService.getChildren(memberUUID);

		return ResponseEntity.ok().body(childDtoList);
	}

	@GetMapping("/children/{child_uuid}")
	public ResponseEntity<ChildDto> getChildInfoRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable("child_uuid") String childUUID) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		ChildDto childDto = childrenService.getChildInfo(memberUUID, childUUID);

		return ResponseEntity.ok().body(childDto);
	}

	@PostMapping("/children/{parentUUID}")
	public ResponseEntity addChildRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable String parentUUID) {

		String childUUID = jwtTokenProvider.getMemberUUID(accessToken);

		childrenService.addParent(parentUUID, childUUID);

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/children/{child_uuid}")
	public ResponseEntity deleteChildRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable("child_uuid") String childUUID) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		childrenService.removeChild(memberUUID, childUUID);

		return ResponseEntity.ok().build();
	}
}
