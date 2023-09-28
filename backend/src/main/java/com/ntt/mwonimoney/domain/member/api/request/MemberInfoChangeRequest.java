package com.ntt.mwonimoney.domain.member.api.request;

import java.util.Optional;

import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberInfoChangeRequest {

	private Optional<String> nickname;
	private Optional<String> email;
	private Optional<String> birthday;
	private Optional<MemberRole> memberRole;
}
