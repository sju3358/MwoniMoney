package com.ntt.mwonimoney.domain.challenge.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.challenge.api.request.ChallengeRequestDto;
import com.ntt.mwonimoney.domain.challenge.api.response.MemberChallengeResponseDto;
import com.ntt.mwonimoney.domain.challenge.entity.Challenge;
import com.ntt.mwonimoney.domain.challenge.entity.MemberChallenge;
import com.ntt.mwonimoney.domain.challenge.repository.ChallengeRepository;
import com.ntt.mwonimoney.domain.challenge.repository.MemberChallengeRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChallengeService {
	private final ChallengeRepository challengeRepository;
	private final MemberChallengeRepository memberChallengeRepository;
	private final MemberRepository memberRepository;

	//짜금통 (돈 보내는 용)
	//계좌이체

	// 부모
	public MemberChallengeResponseDto writeChallenge(ChallengeRequestDto challengeRequestDto,
		Long childIdx) {
		//카테고리번호 조회
		Challenge challenge = challengeRepository.findChallenge(challengeRequestDto.getTitle(),
			challengeRequestDto.getCategory());
		Optional<Member> member = (Optional<Member>)memberRepository.findMemberByIdx(childIdx);

		//memberChallenge 생성
		MemberChallenge memberChallenge = MemberChallenge.builder()
			.challenge(challenge)
			.member(member.orElseThrow())
			.memo(challengeRequestDto.getMemo())
			.reward(challengeRequestDto.getReward())
			.status(challengeRequestDto.getStatus())
			.endTime(challengeRequestDto.getEndTime())
			.build();

		memberChallengeRepository.save(memberChallenge);

		//응답값으로 잘 생성된 data를 보내줌
		return MemberChallengeResponseDto.builder()
			.challengeIdx(memberChallenge.getChallenge().getChallengeIdx())
			.memberIdx(memberChallenge.getMember().getIdx())
			.memo(memberChallenge.getMemo())
			.reward(memberChallenge.getReward())
			.status(memberChallenge.getStatus())
			.endTime(memberChallenge.getEndTime())
			.createdTime(memberChallenge.getCreateTime())
			.build();
	}

	//삭제
	@Transactional(readOnly = false)
	public void deleteChallenge(Long memberChallengeIdx) {
		log.info("서비스 시작");
		memberChallengeRepository.deleteById(memberChallengeIdx);
		log.info("서비스 끝");
	}

	//부모 챌린지 완료
	@Transactional(readOnly = false)
	public void completeChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		MemberChallenge challenge = memberChallenge.orElseThrow(() -> new NoSuchElementException("챌린지 기록이 없습니다."));
		challenge.setStatus(3);
	}

	//부모 챌린지 거절
	@Transactional(readOnly = false)
	public void rejectChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		MemberChallenge challenge = memberChallenge.orElseThrow(() -> new NoSuchElementException("챌린지 기록이 없습니다."));
		challenge.setStatus(4);

	}

	//부모 챌린지 승인
	@Transactional(readOnly = false)
	public void acceptChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		MemberChallenge challenge = memberChallenge.orElseThrow(() -> new NoSuchElementException("챌린지 기록이 없습니다."));
		challenge.setStatus(0);
		// memberChallenge.orElseThrow().setStatus(0);
	}

	//자식
	// 자식 챌린지 생성
	public MemberChallengeResponseDto proposeChallenge(ChallengeRequestDto challengeRequestDto,
		Long childIdx) {
		//카테고리번호 조회
		Challenge challenge = challengeRepository.findChallenge(challengeRequestDto.getTitle(),
			challengeRequestDto.getCategory());

		Optional<Member> member = (Optional<Member>)memberRepository.findMemberByIdx(childIdx);

		//memberChallenge 생성
		MemberChallenge memberChallenge = MemberChallenge.builder()
			.challenge(challenge)
			.member(member.orElseThrow())
			.memo(challengeRequestDto.getMemo())
			.reward(challengeRequestDto.getReward())
			.status(challengeRequestDto.getStatus())
			.endTime(challengeRequestDto.getEndTime())
			.build();

		memberChallengeRepository.save(memberChallenge);

		//응답값으로 잘 생성된 data를 보내줌
		return MemberChallengeResponseDto.builder()
			.challengeIdx(memberChallenge.getChallenge().getChallengeIdx())
			.memberIdx(memberChallenge.getMember().getIdx())
			.memo(memberChallenge.getMemo())
			.reward(memberChallenge.getReward())
			.status(memberChallenge.getStatus())
			.endTime(memberChallenge.getEndTime())
			.createdTime(memberChallenge.getCreateTime())
			.build();
	}

	//자식 챌린지 완료 요청
	@Transactional(readOnly = false)
	public void proposeAcceptChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		MemberChallenge challenge = memberChallenge.orElseThrow(() -> new NoSuchElementException("챌린지 기록이 없습니다."));
		challenge.setStatus(1);
		// memberChallenge.orElseThrow().setStatus(1);
	}

	//공통
	//챌린지 모두 조회
	public List<MemberChallengeResponseDto> selectMemberChallenge(Integer status,
		Long memberIdx) {
		log.info("service selectMemberChallenge");
		List<MemberChallenge> memberChallengeList = new ArrayList<>();
		if (status != 5) {
			memberChallengeList = memberChallengeRepository.findbyStatusandIdx(
				status, memberIdx);

		} else {
			//status가 5이면 전체 조회
			log.info("5");
			memberChallengeList = memberChallengeRepository.findMemberChallengeMemberIdx(memberIdx);
			log.info("오류 안 남");
		}

		return memberChallengeList.stream()
			.map(MemberChallengeResponseDto::new)
			.collect(Collectors.toList());
	}

}
