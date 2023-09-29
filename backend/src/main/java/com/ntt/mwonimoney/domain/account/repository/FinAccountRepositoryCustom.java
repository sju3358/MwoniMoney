package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;

import java.util.List;

public interface FinAccountRepositoryCustom {
    public List<FinAccount> findByMember(Long memberIdx);
}
