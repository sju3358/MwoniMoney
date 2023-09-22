package com.ntt.mwonimoney.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Children;
import com.ntt.mwonimoney.domain.member.entity.ChildrenKey;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.Parent;
import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;
import com.ntt.mwonimoney.domain.member.repository.ChildrenRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ChildrenServiceImpl implements ChildrenService {

	private final MemberRepository memberRepository;
	private final ChildrenRepository childrenRepository;

	@Override
	@Transactional
	public void addParent(Long parentIdx, Long childIdx) {
		Member parent = memberRepository.findMemberByIdx(parentIdx)
			.orElseThrow(() ->new NoSuchElementException("부모님 회원이 존재하지 않습니다."));

		Member child = memberRepository.findMemberByIdx(childIdx)
			.orElseThrow(()->new NoSuchElementException("자식 회원이 존재하지 않습니다."));

		Children children = Children.builder()
			.parent((Parent)parent)
			.child((Child)child)
			.parentIdx(parent.getIdx())
			.childrenIdx(child.getIdx())
			.build();

		childrenRepository.save(children);

	}

	@Override
	public List<ChildDto> getChildren(Long parentIdx) {
		List<Child> childrenEntity = childrenRepository.findChildrenByChildrenKey_ParentIdx(parentIdx);

		List<ChildDto> children = new ArrayList<>();

		if(children.isEmpty() == true)
			throw new NoSuchElementException("자식들이 존재하지 않습니다");

		for(Child childEntity : childrenEntity)
			children.add(childEntity.convertToDto());

		return children;
	}

	@Override
	public ChildDto getChildInfo(Long parentIdx, Long childIdx) {
		ChildDto child = childrenRepository.findChild(parentIdx,childIdx)
			.orElseThrow(()->new NoSuchElementException("자식 정보가 존재하지 않습니다"));

		return child;
	}

	@Override
	@Transactional
	public void removeChild(Long parentIdx, Long childIdx) {

		Children children = childrenRepository.findChildrenByChildrenKey(new ChildrenKey(parentIdx,childIdx))
			.orElseThrow(() -> new NoSuchElementException("해당 부모 아이 관계가 존재하지 않습니다"));

		childrenRepository.delete(children);
	}
}
