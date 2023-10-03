package com.ntt.mwonimoney.domain.account.entity;

import java.util.ArrayList;
import java.util.List;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fin_account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinAccount extends CommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fin_account_idx")
	private Long idx;

	@Column(name = "fin_account_number")
	private String number;

	@Column(name = "fin_account_fin_acno")
	private String finAcno;

	@Enumerated(EnumType.STRING)
	@Column(name = "fin_account_status")
	private FinAccountStatus status;

	@Enumerated(EnumType.STRING)
	@Column(name = "fin_account_type")
	private FinAccountType type;

	@Column(name = "fin_account_remain")
	private Long remain;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_idx")
	private Member member;

	@OneToMany(mappedBy = "finAccount")
	private List<FinAccountTransaction> finAccountTransactionList = new ArrayList<>();

	@Builder
	public FinAccount(String number, String finAcno, FinAccountStatus status, FinAccountType type, Long remain,
		Member member) {
		this.number = number;
		this.finAcno = finAcno;
		this.status = status;
		this.type = type;
		this.remain = remain;
		this.member = member;
	}

	public FinAccountDto convertToDto() {
		return FinAccountDto.builder()
			.idx(this.idx)
			.number(this.number)
			.status(this.status)
			.type(this.type)
			.build();
	}

	public void addMember(Member member) {
		this.member = member;
		//		member.addFinAccount(this);
	}

	public void changeStatus(FinAccountStatus status) {
		this.status = status;
	}

	public void changeRemain(Long remain) {
		this.remain = remain;
	}
}

