package com.ntt.mwonimoney.domain.account.service.v2;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.service.SmallAccountService;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

import lombok.RequiredArgsConstructor;

@Service(value = "SmallAccountServiceV2")
@RequiredArgsConstructor

public class SmallAccountServiceImplV2 implements SmallAccountService {
	@Override
	public void closeSmallAccount(Long smallAccountIdx) {

	}

	@Override
	public FinAccount openSmallAccount(Long memberIdx, SmallAccount smallAccount) {
		return null;
	}

}
