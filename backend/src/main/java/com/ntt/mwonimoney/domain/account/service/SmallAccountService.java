package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

public interface SmallAccountService {

	public void closeSmallAccount(Long smallAccountIdx);

	void openSmallAccount(Long memberIdx, SmallAccount smallAccount);
}
