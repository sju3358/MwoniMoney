package com.ntt.mwonimoney.domain.account.service;

import java.util.List;
import java.util.Optional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;

public interface FinAccountService {

	public List<FinAccount> getFinAccountList();

	public Optional<FinAccount> getFinAccount(Long finAccountIdx);

	public Optional<FinAccount> getFinAccount(Long memberIdx, FinAccountType finAccountType,
		FinAccountStatus finAccountStatus);

	public FinAccount openFinAccount(FinAccount finAccount);

	public FinAccount openFinAccount(FinAccount newFinAccount, Long memberIdx);

	public Long getBalance(Long finAccountIdx);

}
