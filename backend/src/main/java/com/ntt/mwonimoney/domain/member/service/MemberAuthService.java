package com.ntt.mwonimoney.domain.member.service;

import com.ntt.mwonimoney.domain.member.model.dto.MemberAuthDto;

public interface MemberAuthService {

	MemberAuthDto getMemberAuthInfo(String memberUUID);

	void Login(MemberAuthDto memberAuthDto);

	void Logout(String memberUUID);

}
