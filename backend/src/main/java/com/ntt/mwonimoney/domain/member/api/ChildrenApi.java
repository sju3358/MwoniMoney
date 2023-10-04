package com.ntt.mwonimoney.domain.member.api;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;
import com.ntt.mwonimoney.domain.account.service.v2.FinAccountServiceImplV2;
import com.ntt.mwonimoney.domain.member.model.dto.ChildDetailDto;
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
	private final FinAccountServiceImplV2 finAccountServiceImplV2;
	private final JwtTokenProvider jwtTokenProvider;

	@GetMapping("/children")
	public ResponseEntity<List<ChildDto>> getChildrenListRequest(
		@RequestHeader("Authorization") String accessToken) {

		log.info("[자녀 정보목록 조회 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		List<ChildDto> childDtoList = childrenService.getChildren(memberUUID);

		log.info("[자녀 정보목록 조회 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().body(childDtoList);
	}

	@GetMapping("/children/{child_uuid}")
	public ResponseEntity<?> getChildInfoRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable("child_uuid") String childUUID) {

		log.info("[자녀 정보 조회 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		ChildDto childDto = childrenService.getChildInfo(memberUUID, childUUID);

		if (childDto.getSmallAccount() == null) {
			return ResponseEntity.ok().body(childDto);
		}

		ChildDetailDto childDetailDto = ChildDetailDto.builder()
			.uuid(childDto.getUuid())
			.status(childDto.getStatus())
			.name(childDto.getName())
			.nickname(childDto.getNickname())
			.birthday(childDto.getBirthday())
			.socialProvider(childDto.getSocialProvider())
			.memberRole(childDto.getMemberRole())
			.creditScore(childDto.getCreditScore())
			.quizRewardRemain(childDto.getQuizRewardRemain())
			.quizReward(childDto.getQuizReward())
			.goalMoney(childDto.getSmallAccount().getGoalMoney())
			.goalName(childDto.getSmallAccount().getGoalName())
			.imageFilename(childDto.getSmallAccount().getImageFilename())
			.regularAllowance(childDto.getRegularAllowance())
			.challengeAlarm(childDto.getChallengeAlarm())
			.balanceAlarm(childDto.getBalanceAlarm())
			.smallAcountAlarm(childDto.getSmallAcountAlarm())
			.email(childDto.getEmail())
			.build();

		FinAccountDto finAccountDto = finAccountServiceImplV2.getFinAccount(childDetailDto.getUuid(),
			FinAccountType.SMALL);

		childDetailDto.setRemain(finAccountDto.getRemain());

		log.info("[자녀 정보 조회 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().body(childDetailDto);
	}

	@PostMapping("/children/{parentUUID}")
	public ResponseEntity addChildRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable String parentUUID) {

		log.info("[자녀 추가 요청 시작]", LocalDateTime.now());

		String childUUID = jwtTokenProvider.getMemberUUID(accessToken);

		childrenService.addParent(parentUUID, childUUID);

		log.info("[자녀 추가 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/children/{child_uuid}")
	public ResponseEntity deleteChildRequest(
		@RequestHeader("Authorization") String accessToken,
		@PathVariable("child_uuid") String childUUID) {

		log.info("[자녀 삭제 요청 시작]", LocalDateTime.now());

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);

		childrenService.removeChild(memberUUID, childUUID);

		log.info("[자녀 삭제 요청 끝]", LocalDateTime.now());

		return ResponseEntity.ok().build();
	}
}
