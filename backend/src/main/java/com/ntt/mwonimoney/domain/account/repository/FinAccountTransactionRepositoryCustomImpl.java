package com.ntt.mwonimoney.domain.account.repository;

import static com.ntt.mwonimoney.domain.account.entity.QFinAccountTransaction.*;

import java.util.ArrayList;
import java.util.List;

import com.ntt.mwonimoney.domain.account.entity.*;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionListRequestType;
import com.ntt.mwonimoney.domain.account.model.dto.GetTransactionResponseDto;
import com.ntt.mwonimoney.domain.account.model.dtoV2.GetTransactionRequestDto;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class FinAccountTransactionRepositoryCustomImpl implements FinAccountTransactionRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<FinAccountTransactionDto> findFinAccountTransactionByFinAccountIdx(Long finAccountIdx) {
		return jpaQueryFactory
				.select(Projections.bean(FinAccountTransactionDto.class,
						finAccountTransaction.id,
						finAccountTransaction.money,
						finAccountTransaction.balance,
						finAccountTransaction.memo,
						finAccountTransaction.time))
				.from(finAccountTransaction)
				.where(finAccountTransaction.finAccount.idx.eq(finAccountIdx))
				.fetch();
	}

	@Override
	public List<FinAccountTransaction> getTransaction(Long memberIdx, GetTransactionRequestDto getTransactionRequestDto) {
		FinAccountTransactionListRequestType finAccountTransactionListRequestType = getTransactionRequestDto.getType();
		FinAccountType finAccountType = getTransactionRequestDto.getFinAccountType();

		List<FinAccountTransaction> list = new ArrayList<>(); // 초기화

		FinAccount finAccount = jpaQueryFactory.selectFrom(QFinAccount.finAccount)
				.where(QFinAccount.finAccount.type.eq(finAccountType).and(QFinAccount.finAccount.status.eq(FinAccountStatus.ACTIVATE).and(QFinAccount
						.finAccount.member.idx.eq(memberIdx))))
				.fetchOne();

		Long finAccountIdx = finAccount.getIdx();

		log.info("여기까지안오는듯");
		if (finAccountTransactionListRequestType == FinAccountTransactionListRequestType.GENERAL) {
			list = jpaQueryFactory
					.selectFrom(finAccountTransaction)
					.where(
							finAccountTransaction.finAccount.idx.eq(finAccountIdx)
									.and(QFinAccount.finAccount.type.eq(finAccountType))
					)
					.fetch();
		} else if (finAccountTransactionListRequestType == FinAccountTransactionListRequestType.INCOME) {
			list = jpaQueryFactory
					.selectFrom(QFinAccountTransaction.finAccountTransaction)
					.where(
							finAccountTransaction.finAccount.idx.eq(finAccountIdx)
									.and(QFinAccount.finAccount.type.eq(finAccountType))
									.and(QFinAccountTransaction.finAccountTransaction.money.gt(0))
					)
					.fetch();
		} else if (finAccountTransactionListRequestType == FinAccountTransactionListRequestType.OUTCOME) {
			list = jpaQueryFactory
					.selectFrom(QFinAccountTransaction.finAccountTransaction)
					.where(
							finAccountTransaction.finAccount.idx.eq(finAccountIdx)
									.and(QFinAccount.finAccount.type.eq(finAccountType))
									.and(QFinAccountTransaction.finAccountTransaction.money.lt(0))
					)
					.fetch();
		}

		return list;
	}
}
