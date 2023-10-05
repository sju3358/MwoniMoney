package com.ntt.mwonimoney.domain.member.repository;

import static com.ntt.mwonimoney.domain.member.entity.QMember.*;

import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Guest;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.Parent;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CustomMemberRepositoryImpl implements CustomMemberRepository {

	private final JPAQueryFactory jpaQueryFactory;
	private final EntityManager em;

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

	@Override
	@Transactional
	public Optional<Member> changeAndSaveMemberRole(Long memberIdx, MemberRole memberRole) {
		Member result = jpaQueryFactory
			.select(member)
			.from(member)
			.where(member.idx.eq(memberIdx))
			.fetchOne();

		if (result.getMemberRole().equals(MemberRole.GUEST) != true)
			throw new IllegalArgumentException("게스트만 변경 가능");
		else {

			Member memberRoleChanged = null;
			if (memberRole.equals(MemberRole.CHILD)) {
				memberRoleChanged = Child.builder()
					.status(result.getStatus())
					.uuid(result.getUuid())
					.name(result.getName())
					.nickname(result.getNickname())
					.birthday(result.getBirthday())
					.socialProvider(result.getSocialProvider())
					.socialId(result.getSocialId())
					.email(result.getEmail())
					.regularAllowance(0)
					.regularAllowanceDay(0)
					.creditScore(0)
					.quizReward(0)
					.quizRewardRemain(0)
					.balanceAlarm("Y")
					.challengeAlarm("Y")
					.smallAcountAlarm("Y")
					.build();
			} else if (memberRole.equals(MemberRole.PARENT)) {
				memberRoleChanged = Parent.builder()
					.status(result.getStatus())
					.uuid(result.getUuid())
					.name(result.getName())
					.nickname(result.getNickname())
					.birthday(result.getBirthday())
					.socialProvider(result.getSocialProvider())
					.socialId(result.getSocialId())
					.email(result.getEmail())
					.balanceAlarm("Y")
					.challengeAlarm("Y")
					.smallAcountAlarm("Y")
					.build();
			} else {
				throw new IllegalArgumentException(
					result.getMemberRole().name() + "에서 " + memberRoleChanged.getMemberRole() + "으로 변경 불가능합니다.");
			}

			em.remove(result);
			em.flush();
			em.persist(memberRoleChanged);
			return Optional.of(memberRoleChanged);
		}
	}

	@Override
	public Long findMemberIdxByUuid(String memberUUID) {
		return jpaQueryFactory
			.select(member.idx)
			.from(member)
			.where(member.uuid.eq(memberUUID))
			.fetchOne();

	}
}