package com.ntt.mwonimoney.domain.account.repository;

import java.util.Optional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;

import jakarta.transaction.Transactional;

@Transactional
public interface FinAccountRepositoryCustom {
	public Optional<FinAccount> findFinAccountByMemberAndTypeAndStatus(Long memberIdx, FinAccountType finAccountType,
		FinAccountStatus finAccountStatus);

	Optional<FinAccountDto> findFinAccountDtoByMemberIdxAndType(Long memberIdx, FinAccountType type);

	Optional<FinAccount> findFinAccountByMemberIdxAndType(Long memberIdx, FinAccountType type);
}
