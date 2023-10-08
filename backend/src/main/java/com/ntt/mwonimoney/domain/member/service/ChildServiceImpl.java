package com.ntt.mwonimoney.domain.member.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.ChildrenKey;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.repository.ChildrenRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChildServiceImpl implements ChildService {

	private final MemberRepository memberRepository;
	private final ChildrenRepository childrenRepository;

	@Override
	@Transactional
	public SmallAccount addSmallAccountInfo(Long memberIdx, int goalMoney, String goalName, String imageFilename,
		int saveRatio) {

		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버 정보가 존재하지 않습니다."));

		if (member.getMemberRole().equals(MemberRole.CHILD) != true)
			throw new IllegalArgumentException("자녀 회원이 아닙니다");

		if (((Child)member).getSmallAccount() != null)
			throw new IllegalArgumentException("짜금통 정보가 이미 존재합니다.");

		((Child)member).makeSmallAccount(goalMoney, goalName, imageFilename, saveRatio);

		return new SmallAccount(goalMoney, goalName, imageFilename, saveRatio);
	}

	@Override
	@Transactional
	public void deleteSmallAccountInfo(Long memberIdx) {

		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버 정보가 존재하지 않습니다."));

		if (member.getMemberRole().equals(MemberRole.CHILD) != true)
			throw new IllegalArgumentException("자녀 회원이 아닙니다");

		((Child)member).deleteSmallAccount();
	}

	@Override
	@Transactional
	public void editQuizReward(String childUUID, int quizReward) {

		Member member = memberRepository.findMemberByUuid(childUUID)
			.orElseThrow(() -> new NoSuchElementException("멤버 정보가 존재하지 않습니다."));

		if (member.getMemberRole().equals(MemberRole.CHILD) != true)
			throw new IllegalArgumentException("자녀 회원이 아닙니다");

		((Child)member).changeQuizReward(quizReward);
	}

	@Override
	@Transactional
	public void editQuizRewardRemain(String childUUID, int quiRewardRemainToAdd) {
		Member member = memberRepository.findMemberByUuid(childUUID)
			.orElseThrow(() -> new NoSuchElementException("멤버 정보가 존재하지 않습니다."));

		if (member.getMemberRole().equals(MemberRole.CHILD) != true)
			throw new IllegalArgumentException("자녀 회원이 아닙니다");

		if (quiRewardRemainToAdd > 0)
			((Child)member).addQuizRewardRemain(quiRewardRemainToAdd);
		else
			((Child)member).subQuizRewardRemain((-1) * quiRewardRemainToAdd);

	}

	@Override
	public void checkParent(String parentUUID, String childUUID) {
		ChildrenKey key = new ChildrenKey(parentUUID, childUUID);
		childrenRepository.findChildrenByChildrenKey(key)
			.orElseThrow(() -> new NoSuchElementException("부모가 아닙니다"));
	}

	@Override
	@Transactional
	public void changeChildCreditScore(String childUUID, int scoreToAdd) {
		Member child = memberRepository.findMemberByUuid(childUUID)
			.orElseThrow(() -> new NoSuchElementException("회원 정보가 존재하지 않습니다"));

		if (child.getMemberRole().equals(MemberRole.CHILD) != true)
			throw new IllegalArgumentException("자녀 회원만 변경 가능합니다");

		((Child)child).changeCreditScore(scoreToAdd);
	}

	@Override
	@Transactional
	public void changeRegularAllowance(String childUUID, int regularAllowance, int regularAllowanceDay) {
		Member child = memberRepository.findMemberByUuid(childUUID)
			.orElseThrow(() -> new NoSuchElementException("회원 정보가 존재하지 않습니다"));

		if (child.getMemberRole().equals(MemberRole.CHILD) != true)
			throw new IllegalArgumentException("자녀 회원만 변경 가능합니다");

		((Child)child).changeRegularAllowance(regularAllowance, regularAllowanceDay);
	}

}
