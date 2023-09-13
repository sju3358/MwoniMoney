package com.ntt.wannabee.domain.member.entity;

import com.ntt.wannabee.domain.member.model.dto.MemberDto;
import com.ntt.wannabee.domain.member.model.vo.MemberRole;
import com.ntt.wannabee.domain.member.model.vo.SocialProvider;
import com.ntt.wannabee.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "member")
public class Member extends CommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_idx")
	private Long idx;

	@Column(name = "member_uuid")
	private String uuid;

	@Column(name = "member_status")
	private byte status;

	@Column(name = "member_name")
	private String name;

	@Column(name = "member_nickname")
	private String nickname;

	@Column(name = "member_birthday")
	private String birthday;

	@Enumerated(EnumType.STRING)
	@Column(name = "member_social_provider")
	private SocialProvider socialProvider;

	@Column(name = "member_social_id")
	private String socialId;

	@Enumerated(EnumType.STRING)
	@Column(name = "member_role")
	private MemberRole memberRole;

	@Builder
	public Member(String uuid, byte status, String name, String nickname, String birthday,
		SocialProvider socialProvider,
		String socialId, MemberRole memberRole) {
		this.uuid = uuid;
		this.status = status;
		this.name = name;
		this.nickname = nickname;
		this.birthday = birthday;
		this.socialProvider = socialProvider;
		this.socialId = socialId;
		this.memberRole = memberRole;
	}

	public MemberDto convertToDto() {
		return MemberDto.builder()
			.idx(this.idx)
			.uuid(this.uuid)
			.status(this.status)
			.name(this.name)
			.nickname(this.nickname)
			.birthday(this.birthday)
			.socialProvider(this.socialProvider)
			.socialId(this.socialId)
			.memberRole(this.memberRole)
			.build();
	}
}