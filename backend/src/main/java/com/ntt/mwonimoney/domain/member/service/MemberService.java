package com.ntt.mwonimoney.domain.member.service;

import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;

public interface MemberService {

	public void changeNickname(String newNickName);

	public void addSmallAccount(SmallAccount smallAccount);

	public void finishSmallAccount(String uuid);

	public void getMemberInfo(String uuid);

	public void addMemberInfo(MemberDto memberDto, int role, String memberUuid);
}
