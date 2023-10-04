package com.ntt.mwonimoney.domain.member.api.request;

import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeMemberRoleRequest {
	private MemberRole memberRole;
}
