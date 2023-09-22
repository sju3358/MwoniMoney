package com.ntt.mwonimoney.domain.member.repository;

import static com.ntt.mwonimoney.domain.member.entity.QChild.*;
import static com.ntt.mwonimoney.domain.member.entity.QChildren.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Children;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CustomChildrenRepositoryImpl implements CustomChildrenRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<Child> findChild(String parentUUID, String childUUID) {
		Children result = jpaQueryFactory
			.select(children)
			.from(children)
			.where(children.childrenKey.parentUUID.eq(parentUUID)
				.and(children.childrenKey.childUUID.eq(childUUID)))
			.join(children.child, child).fetchJoin()
			.fetchOne();

		if (result == null)
			return Optional.empty();

		return Optional.of(result.getChild());
	}

	@Override
	public List<Child> findChildren(String parentUUID) {
		List<Children> childrenEntityList = jpaQueryFactory
			.select(children)
			.from(children)
			.where(children.childrenKey.parentUUID.eq(parentUUID))
			.join(children.child, child).fetchJoin()
			.fetch();

		List<Child> childEntityList = new ArrayList<>();

		for (Children childrenEntity : childrenEntityList)
			childEntityList.add(childrenEntity.getChild());

		return childEntityList;
	}
}
