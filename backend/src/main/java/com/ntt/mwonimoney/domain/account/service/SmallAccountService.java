package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

public interface SmallAccountService {

	public void closeSmallAccount(Long smallAccountIdx);

	public FinAccount openSmallAccount(Long memberIdx, SmallAccount smallAccount);

}
