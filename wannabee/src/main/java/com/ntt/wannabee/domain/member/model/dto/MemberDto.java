package com.ntt.wannabee.domain.member.model.dto;

import com.ntt.wannabee.domain.member.model.vo.MemberRole;
import com.ntt.wannabee.domain.member.model.vo.SocialProvider;

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

	private MemberRole memberRole;

	private SocialProvider socialProvider;

	private String socialId;
}
