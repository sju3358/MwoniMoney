package com.ntt.mwonimoney.domain.member.service;

import com.ntt.mwonimoney.domain.member.api.request.MemberInfoChangeRequest;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;

public interface MemberService {

	public MemberDto getMemberInfo(Long memberIdx);

	public void editMember(MemberInfoChangeRequest request, Long memberIdx);

}
