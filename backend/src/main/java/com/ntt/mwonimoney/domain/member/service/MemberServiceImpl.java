package com.ntt.mwonimoney.domain.member.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.api.request.MemberInfoChangeRequest;
import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.MemberAuth;
import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final MemberAuthRepository memberAuthRepository;

	@Value("${aws.s3.image.goal.url}")
	private String S3ImageUrl;

	@Override
	public MemberDto getMemberInfo(Long memberIdx) {
		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버정보가 존재하지 않습니다"));

		if (member.getMemberRole().equals(MemberRole.CHILD) && ((Child)member).getSmallAccount() != null) {
			MemberDto dto = member.convertToDto();
			SmallAccount smallAccount = new SmallAccount(
				((ChildDto)dto).getSmallAccount().getGoalMoney(),
				((ChildDto)dto).getSmallAccount().getGoalName(),
				S3ImageUrl + ((ChildDto)dto).getSmallAccount().getImageFilename(),
				((ChildDto)dto).getSmallAccount().getSaveRatio()
			);
			((ChildDto)dto).setSmallAccount(smallAccount);
			return dto;
		}

		return member.convertToDto();
	}

	@Override
	@Transactional
	public void editMember(MemberInfoChangeRequest request, Long memberIdx) {

		Member member = memberRepository.findMemberByIdx(memberIdx)
			.orElseThrow(() -> new NoSuchElementException("멤버정보가 존재하지 않습니다"));

		if (request.getName().isPresent())
			member.changeMemberName(request.getName().get());

		if (request.getEmail().isPresent())
			member.changeMemberEmail(request.getEmail().get());

		if (request.getNickname().isPresent())
			member.changeMemberNickname(request.getNickname().get());

		if (request.getBirthday().isPresent())
			member.changeMemberBirthday(request.getBirthday().get());
	}

	@Override
	@Transactional
	/**
	 * change MemberRole
	 * return : changed Member's idx
	 */
	public void changeMemberRole(String memberUUID, MemberRole memberRole) {

		MemberAuth memberAuth = memberAuthRepository.findById(memberUUID)
			.orElseThrow(() -> new NoSuchElementException("로그인이 안되어있습니다."));

		Member changedMember = memberRepository.changeAndSaveMemberRole(memberAuth.getMemberIdx(), memberRole)
			.orElseThrow(() -> new NoSuchElementException("멤버 역할 변경 오류"));

		memberAuth.changeMemberIdx(changedMember.getIdx());

		memberAuthRepository.save(memberAuth);

	}

}
