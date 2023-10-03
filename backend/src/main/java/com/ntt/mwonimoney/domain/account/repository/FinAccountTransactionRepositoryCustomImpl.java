package com.ntt.mwonimoney.domain.account.repository;

import static com.ntt.mwonimoney.domain.account.entity.QFinAccountTransaction.*;

import java.util.List;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto2;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FinAccountTransactionRepositoryCustomImpl implements FinAccountTransactionRepositoryCustom {
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<FinAccountTransactionDto2> findFinAccountTransactionByFinAccountIdx(Long finAccountIdx) {
		return jpaQueryFactory
			.select(Projections.bean(FinAccountTransactionDto2.class,
				finAccountTransaction.id,
				finAccountTransaction.money,
				finAccountTransaction.balance,
				finAccountTransaction.memo,
				finAccountTransaction.time))
			.from(finAccountTransaction)
			.where(finAccountTransaction.finAccount.idx.eq(finAccountIdx))
			.fetch();
	}
}
