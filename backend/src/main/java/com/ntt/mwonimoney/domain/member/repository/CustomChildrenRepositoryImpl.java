package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Children;
import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import static com.ntt.mwonimoney.domain.member.entity.QChildren.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CustomChildrenRepositoryImpl implements CustomChildrenRepository{

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<ChildDto> findChild(Long parentIdx, Long childIdx) {
		Children result = jpaQueryFactory
			.select(children)
			.from(children)
			.where(children.childrenKey.parentIdx.eq(parentIdx)
				.and(children.childrenKey.childIdx.eq(childIdx)))
			.fetchOne();

		if(result == null)
			return Optional.empty();

		return Optional.of(result.getChild().convertToDto());
	}
}
