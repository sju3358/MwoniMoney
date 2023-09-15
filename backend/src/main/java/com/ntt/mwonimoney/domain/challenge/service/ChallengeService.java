package com.ntt.mwonimoney.domain.challenge.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.challenge.repository.ChallengeRepositiry;
import com.ntt.mwonimoney.domain.challenge.repository.MemberChallengeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChallengeService {
	private final ChallengeRepositiry challengeRepositiry;
	private final MemberChallengeRepository memberChallengeRepository;
	//멤버
	//짜금통 (돈 보내는 용)
	//계좌이체

}
