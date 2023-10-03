package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

import java.util.List;
import java.util.Optional;

public interface FinAccountRepositoryCustom {
    public Optional<FinAccount> findFinAccountByMemberAndType(Long memberIdx, FinAccountType finAccountType);

}
