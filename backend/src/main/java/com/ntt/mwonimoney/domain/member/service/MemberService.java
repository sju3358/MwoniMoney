package com.ntt.mwonimoney.domain.member.service;

import com.ntt.mwonimoney.domain.member.api.request.MemberInfoChangeRequest;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;

public interface MemberService {

	public MemberDto getMemberInfo(Long memberIdx);

	public void editMember(MemberInfoChangeRequest request, Long memberIdx);

	public void changeMemberRole(Long memberIdx, MemberRole memberRole);
}
