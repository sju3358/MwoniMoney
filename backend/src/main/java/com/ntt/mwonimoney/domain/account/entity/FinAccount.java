package com.ntt.mwonimoney.domain.account.entity;

import com.ntt.mwonimoney.domain.account.model.dto.FinAccountDto;

import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fin_account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinAccount extends CommonEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fin_account_idx")
	private Long idx;

	@Column(name = "fin_account_number")
	private String number;

	@Enumerated(EnumType.STRING)
	@Column(name = "fin_account_status")
	private FinAccountStatus status;

	@Enumerated(EnumType.STRING)
	@Column(name = "fin_account_type")
	private FinAccountType type;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_idx")
	private Member member;

	@OneToMany(mappedBy = "finAccount")
	private List<FinAccountTransaction> finAccountTransactionList = new ArrayList<>();


	@Builder
	public FinAccount(String number, FinAccountStatus status, FinAccountType type){
		this.number = number;
		this.status = status;
		this.type = type;
	}

	public FinAccountDto convertToDto(){
		return FinAccountDto.builder()
			.idx(this.idx)
			.number(this.number)
			.status(this.status)
			.type(this.type)
			.build();
	}
}
