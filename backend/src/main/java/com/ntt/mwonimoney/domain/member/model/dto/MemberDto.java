package com.ntt.mwonimoney.domain.member.model.dto;

import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public abstract class MemberDto {

	private String uuid;

	private int status;

	private String name;

	private String nickname;

	private String birthday;

	private SocialProvider socialProvider;

	private MemberRole memberRole;

	private String challengeAlarm;

	private String balanceAlarm;

	private String smallAcountAlarm;

	private String email;

}
