package com.ntt.mwonimoney.domain.member.repository;

import static com.ntt.mwonimoney.domain.member.entity.QMember.*;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Guest;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.Parent;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CustomMemberRepositoryImpl implements CustomMemberRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<? extends Member> findMemberByIdx(Long memberIdx) {
		Member memberEntity = jpaQueryFactory
			.select(member)
			.from(member)
			.where(member.idx.eq(memberIdx))
			.fetchOne();

		if (memberEntity == null)
			return Optional.empty();

		if (memberEntity.getMemberRole().equals(MemberRole.GUEST))
			return Optional.of((Guest)memberEntity);

		if (memberEntity.getMemberRole().equals(MemberRole.CHILD))
			return Optional.of((Child)memberEntity);

		if (memberEntity.getMemberRole().equals(MemberRole.PARENT))
			return Optional.of((Parent)memberEntity);

		return Optional.empty();

	}

	@Override
	public Optional<? extends Member> findMemberByUuid(String memberUUID) {
		Member memberEntity = jpaQueryFactory
			.select(member)
			.from(member)
			.where(member.uuid.eq(memberUUID))
			.fetchOne();

		if (memberEntity == null)
			return Optional.empty();

		if (memberEntity.getMemberRole().equals(MemberRole.GUEST))
			return Optional.of((Guest)memberEntity);

		if (memberEntity.getMemberRole().equals(MemberRole.CHILD))
			return Optional.of((Child)memberEntity);

		if (memberEntity.getMemberRole().equals(MemberRole.PARENT))
			return Optional.of((Parent)memberEntity);

		return Optional.empty();
	}

	@Override
	public Optional<? extends Member> findMemberBySocialId(String socialId) {
		Member memberEntity = jpaQueryFactory
			.select(member)
			.from(member)
			.where(member.socialId.eq(socialId))
			.fetchOne();

		if (memberEntity == null)
			return Optional.empty();

		if (memberEntity.getMemberRole().equals(MemberRole.GUEST))
			return Optional.of((Guest)memberEntity);

		if (memberEntity.getMemberRole().equals(MemberRole.CHILD))
			return Optional.of((Child)memberEntity);

		if (memberEntity.getMemberRole().equals(MemberRole.PARENT))
			return Optional.of((Parent)memberEntity);

		return Optional.empty();
	}
}
