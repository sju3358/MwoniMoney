package com.ntt.mwonimoney.domain.challenge.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.challenge.api.request.ChallengeRequestDto;
import com.ntt.mwonimoney.domain.challenge.api.request.MemberChallengeRequestDto;
import com.ntt.mwonimoney.domain.challenge.api.response.MemberChallengeResponseDto;
import com.ntt.mwonimoney.domain.challenge.entity.Challenge;
import com.ntt.mwonimoney.domain.challenge.entity.MemberChallenge;
import com.ntt.mwonimoney.domain.challenge.repository.ChallengeRepositiry;
import com.ntt.mwonimoney.domain.challenge.repository.MemberChallengeRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.global.common.entity.BaseResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChallengeService {
	private final ChallengeRepositiry challengeRepository;
	private final MemberChallengeRepository memberChallengeRepository;
	private final MemberRepository memberRepository;

	//짜금통 (돈 보내는 용)
	//계좌이체

	// 부모
	public BaseResponseDto writeChallenge(ChallengeRequestDto challengeRequestDto, Long parentIdx, Long childIdx) {
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
		return BaseResponseDto.builder()
			.success(true)
			.message("gg")
			.data(MemberChallengeResponseDto.builder()
				.challengeIdx(memberChallenge.getChallenge().getChallengeIdx())
				.memberIdx(memberChallenge.getMember().getIdx())
				.memo(memberChallenge.getMemo())
				.reward(memberChallenge.getReward())
				.status(memberChallenge.getStatus())
				.endTime(memberChallenge.getEndTime())
				.createdTime(memberChallenge.getCreateTime())
				.build())
			.build();
	}

	//삭제
	public BaseResponseDto deleteChallenge(Long parentIdx, Long memberChallengeIdx) {

		memberChallengeRepository.deleteById(memberChallengeIdx);

		return BaseResponseDto.builder()
			.success(true)
			.message("g")
			.build();
	}

	//부모 챌린지 완료
	@Transactional(readOnly = false)
	public BaseResponseDto completeChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		memberChallenge.orElseThrow().setStatus(2);

		return BaseResponseDto.builder()
			.success(true)
			.message("g")
			.build();
	}

	//부모 챌린지 거절
	@Transactional(readOnly = false)
	public BaseResponseDto rejectChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		memberChallenge.orElseThrow().setStatus(4);

		return BaseResponseDto.builder()
			.success(true)
			.message("부모가 챌린지를 거절했습니다")
			.build();
	}

	//부모 챌린지 승인
	@Transactional(readOnly = false)
	public BaseResponseDto acceptChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		memberChallenge.orElseThrow().setStatus(0);

		return BaseResponseDto.builder()
			.success(true)
			.message("부모가 챌린지를 승인했습니다.")
			.build();
	}

	//자식
	// 자식 챌린지 생성
	public BaseResponseDto proposeChallenge(ChallengeRequestDto challengeRequestDto, Long parentIdx, Long childIdx) {
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
		return BaseResponseDto.builder()
			.success(true)
			.message("gg")
			.data(MemberChallengeResponseDto.builder()
				.challengeIdx(memberChallenge.getChallenge().getChallengeIdx())
				.memberIdx(memberChallenge.getMember().getIdx())
				.memo(memberChallenge.getMemo())
				.reward(memberChallenge.getReward())
				.status(memberChallenge.getStatus())
				.endTime(memberChallenge.getEndTime())
				.createdTime(memberChallenge.getCreateTime())
				.build())
			.build();
	}

	//자식 챌린지 완료 요청
	public BaseResponseDto proposeAcceptChallenge(Long memberChallengeIdx) {
		Optional<MemberChallenge> memberChallenge = memberChallengeRepository.findById(memberChallengeIdx);

		memberChallenge.orElseThrow().setStatus(3);

		return BaseResponseDto.builder()
			.success(true)
			.message("자식이 챌린지를 완료 요청했습니다.")
			.build();
	}

	//공통
	//챌린지 모두 조회
	public List<MemberChallengeResponseDto> selectMemberChallenge(MemberChallengeRequestDto memberChallengeRequestDto,
		Long memberIdx) {
		List<MemberChallenge> memberChallengeList = new ArrayList<>();
		if (memberChallengeRequestDto.getStatus() != 5) {
			//member를 이용하니까 fetch join을 사용해서 member랑 조인하고, memberid가 같은거랑 status가 같은 것을 찾는다.
			memberChallengeList = memberChallengeRepository.findbyStatusandIdx(
				memberChallengeRequestDto.getStatus(), memberIdx);

		} else {
			//status가 5이면 전체 조회
			memberChallengeList = memberChallengeRepository.findByMemberIdQuery(memberIdx);
		}

		return memberChallengeList.stream()
			.map(MemberChallengeResponseDto::new)
			.collect(Collectors.toList());
	}

}
