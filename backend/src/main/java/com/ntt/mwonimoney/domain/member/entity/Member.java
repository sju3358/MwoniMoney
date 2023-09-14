package com.ntt.mwonimoney.domain.member.entity;

import java.util.UUID;

import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.model.vo.SocialProvider;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;

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
import lombok.experimental.SuperBuilder;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "member")
public abstract class Member extends CommonEntity {

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


	protected Member(byte status, String name, String nickname, String birthday,
		SocialProvider socialProvider,
		String socialId, MemberRole memberRole) {
		this.uuid = UUID.randomUUID().toString();
		this.status = status;
		this.name = name;
		this.nickname = nickname;
		this.birthday = birthday;
		this.socialProvider = socialProvider;
		this.socialId = socialId;
		this.memberRole = memberRole;
	}
}
