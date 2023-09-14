package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Child extends Member {

	@Column(name = "member_credit_score")
	private byte creditScore;

	@Embedded
	private SmallAccount smallAccount;

	@Builder
	public Child(byte status, String name, String nickname, String birthday,
		SocialProvider socialProvider,
		String socialId, byte creditScore, SmallAccount smallAccount){
		super(status, name, nickname, birthday, socialProvider, socialId, MemberRole.CHILD);
		this.creditScore = creditScore;
		this.smallAccount = smallAccount;
	}

	public ChildDto convertToDto() {

		return ChildDto.builder()
			.idx(this.getIdx())
			.uuid(this.getUuid())
			.status(this.getStatus())
			.name(this.getName())
			.nickname(this.getNickname())
			.birthday(this.getBirthday())
			.socialProvider(this.getSocialProvider())
			.socialId(this.getSocialId())
			.memberRole(this.getMemberRole())
			.creditScore(this.creditScore)
			.smallAccount(smallAccount.createVo())
			.build();
	}

}
