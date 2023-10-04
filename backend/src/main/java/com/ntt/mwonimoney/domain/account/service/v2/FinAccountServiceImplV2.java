package com.ntt.mwonimoney.domain.account.service.v2;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.service.FinAccountService;

import lombok.RequiredArgsConstructor;

@Service(value = "FinAccountServiceV2")
@RequiredArgsConstructor
public class FinAccountServiceImplV2 implements FinAccountService {
	@Override
	public List<FinAccount> getFinAccountList() {
		return null;
	}

	@Override
	public Optional<FinAccount> getFinAccount(Long finAccountIdx) {
		return Optional.empty();
	}

	@Override
	public Optional<FinAccount> getFinAccount(Long memberIdx, FinAccountType finAccountType,
		FinAccountStatus finAccountStatus) {
		return Optional.empty();
	}

	@Override
	public FinAccount openFinAccount(FinAccount finAccount) {
		return null;
	}

	@Override
	public FinAccount openFinAccount(FinAccount newFinAccount, Long memberIdx) {
		return null;
	}

	@Override
	public Long getBalance(Long finAccountIdx) {
		return null;
	}
}
