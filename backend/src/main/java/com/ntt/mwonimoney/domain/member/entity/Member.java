package com.ntt.mwonimoney.domain.member.entity;

import java.util.UUID;

import com.ntt.mwonimoney.domain.member.model.dto.GuestDto;
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
import lombok.Getter;
import lombok.NoArgsConstructor;

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

	@Column(name = "member_uuid", unique = true, nullable = false)
	protected String uuid;

	@Column(name = "member_status", nullable = false)
	protected int status;

	@Column(name = "member_name")
	protected String name;

	@Column(name = "member_nickname")
	protected String nickname;

	@Column(name = "member_birthday")
	protected String birthday;

	@Enumerated(EnumType.STRING)
	@Column(name = "member_social_provider")
	private SocialProvider socialProvider;

	@Column(name = "member_social_id", unique = true)
	private String socialId;

	@Column(name = "member_email")
	protected String email;

	@Enumerated(EnumType.STRING)
	@Column(name = "member_role")
	private MemberRole memberRole;

	@Column(name = "FCMToken")
	private String FCMToken;

	@Column(name = "challenge_alarm")
	private String challengeAlarm;

	@Column(name = "balance_alarm")
	private String balanceAlarm;

	@Column(name = "smallAcount_alarm")
	private String smallAcountAlarm;

	public void activateMember() {
		this.status = 1;
	}

	public void changeMemberEmail(String email) {
		this.email = email;
	}

	public void changeMemberBirthday(String birthday) {
		this.birthday = birthday;
	}

	public void changeMemberNickname(String nickname) {
		this.nickname = nickname;
	}

	public void changeMemberName(String name) {
		this.name = name;
	}

	protected Member(int status, String memberUUID, String name, String nickname, String birthday,
		SocialProvider socialProvider,
		String socialId, String email, MemberRole memberRole, String challengeAlarm, String balanceAlarm,
		String smallAcountAlarm) {
		if (memberUUID == null || memberUUID.isEmpty())
			this.uuid = UUID.randomUUID().toString();
		else
			this.uuid = memberUUID;
		this.status = status;
		this.name = name;
		this.nickname = nickname;
		this.birthday = birthday;
		this.socialProvider = socialProvider;
		this.socialId = socialId;
		this.email = email;
		this.memberRole = memberRole;
		this.challengeAlarm = challengeAlarm;
		this.balanceAlarm = balanceAlarm;
		this.smallAcountAlarm = smallAcountAlarm;
	}

	public MemberDto convertToDto() {
		return GuestDto.builder().build();
	}

	public void updateFCMToken(String FCMToken) {
		this.FCMToken = FCMToken;
	}

}
