package com.ntt.mwonimoney.domain.member.model.dto;

import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class MemberDto {

	private Long idx;

	private String uuid;

	private byte status;

	private String name;

	private String nickname;

	private String birthday;

	private SocialProvider socialProvider;
	
	private String socialId;

	private MemberRole memberRole;

}
