package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class FinAccountRepositoryCustomImpl implements FinAccountRepositoryCustom{
    private final EntityManager em;

    @Override
    public List<FinAccount> findByMember(Long memberIdx){
        return em.createQuery("select f from FinAccount f where f.member.idx=:idx", FinAccount.class).setParameter("idx", memberIdx).getResultList();
    };

}
