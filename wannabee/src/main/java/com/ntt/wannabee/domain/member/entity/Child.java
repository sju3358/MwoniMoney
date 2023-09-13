package com.ntt.wannabee.domain.member.entity;

import com.ntt.wannabee.domain.member.model.dto.ChildDto;
import com.ntt.wannabee.domain.member.model.vo.SmallAccount;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@SuperBuilder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Child extends Member {

	private byte creditScore;

	@Embedded
	private SmallAccount smallAccount;

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
