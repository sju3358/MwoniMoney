package com.ntt.mwonimoney.domain.account.service.v1;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.account.service.SmallAccountService;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Primary
@Transactional
public class SmallAccountServiceImpl implements SmallAccountService {

	private final FinAccountRepository finAccountRepository;

	@Override
	public void closeSmallAccount(Long smallAccountIdx) {

		FinAccount smallAccountToUpdate = finAccountRepository.findById(smallAccountIdx).orElseThrow();
		smallAccountToUpdate.changeStatus(FinAccountStatus.DEACTIVATE);

	}

	@Override
	public void openSmallAccount(Long memberIdx, SmallAccount smallAccount) {
	}

}
