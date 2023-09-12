package com.ntt.wannabee.domain.member.dto;

import com.ntt.wannabee.domain.member.entity.MemberRole;
import com.ntt.wannabee.domain.member.entity.SocialProvider;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
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
