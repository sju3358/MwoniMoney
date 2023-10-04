package com.ntt.mwonimoney.domain.account.repository;

import static com.ntt.mwonimoney.domain.account.entity.QFinAccount.*;

import java.util.Optional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
public class FinAccountRepositoryCustomImpl implements FinAccountRepositoryCustom {

	private final EntityManager em;
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<FinAccount> findFinAccountByMemberAndTypeAndStatus(Long memberIdx, FinAccountType finAccountType,
		FinAccountStatus finAccountStatus) {
		TypedQuery<FinAccount> query = em.createQuery(
				"SELECT f FROM FinAccount f WHERE f.member.idx = :idx AND f.type = :type AND f.status = :status",
				FinAccount.class
			)
			.setParameter("idx", memberIdx)
			.setParameter("type", finAccountType)
			.setParameter("status", finAccountStatus);

		try {
			FinAccount finAccount = query.getSingleResult(); // 결과가 하나일 경우
			return Optional.ofNullable(finAccount);
		} catch (NoResultException e) {
			return Optional.empty(); // 결과가 없을 경우
		}
	}

	@Override
	public Optional<FinAccountDto> findFinAccountDtoByMemberIdxAndType(Long memberIdx, FinAccountType type) {

		FinAccountDto result = jpaQueryFactory
			.select(Projections.bean(FinAccountDto.class,
				finAccount.finAcno,
				finAccount.type,
				finAccount.remain))
			.from(finAccount)
			.where(
				finAccount.member.idx.eq(memberIdx).and(
					finAccount.status.eq(FinAccountStatus.ACTIVATE)).and(
					finAccount.type.eq(type)))
			.fetchOne();

		if (result == null)
			return Optional.empty();

		return Optional.of(result);
	}

	@Override
	public Optional<FinAccount> findFinAccountByMemberIdxAndType(Long memberIdx, FinAccountType type) {

		FinAccount result = jpaQueryFactory
			.select(finAccount)
			.from(finAccount)
			.where(
				finAccount.member.idx.eq(memberIdx).and(
					finAccount.type.eq(type)))
			.fetchOne();

		if (result == null)
			return Optional.empty();

		return Optional.of(result);

	}

}
