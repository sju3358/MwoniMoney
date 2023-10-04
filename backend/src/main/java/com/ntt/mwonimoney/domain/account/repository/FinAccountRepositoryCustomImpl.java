package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.entity.QFinAccount;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
public class FinAccountRepositoryCustomImpl implements FinAccountRepositoryCustom{
	private final EntityManager em;

	private final JPAQueryFactory jpaQueryFactory;
	@Override
	public Optional<FinAccount> findFinAccountByMemberAndTypeAndStatus(Long memberIdx, FinAccountType finAccountType, FinAccountStatus finAccountStatus){
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
	public FinAccount getFinAccountByUUID(Long memberIdx, FinAccountType type) {

		FinAccount result = jpaQueryFactory.selectFrom(QFinAccount.finAccount)
				.where(QFinAccount.finAccount.type.eq(type).and(QFinAccount.finAccount.status.eq(FinAccountStatus.ACTIVATE).and(QFinAccount
						.finAccount.member.idx.eq(memberIdx))))
				.fetchOne();

		return result;
	}


}
