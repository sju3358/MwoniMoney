package com.ntt.wannabee.domain.account.entity;

import com.ntt.wannabee.domain.account.dto.FinAccountDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fin_account")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinAccountEntity {

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idx;

	@Column(name = "fin_account_number")
	private String number;

	@Enumerated(EnumType.STRING)
	@Column(name = "fin_account_status")
	private FinAccountStatus status;

	@Enumerated(EnumType.STRING)
	@Column(name = "fin_account_type")
	private FinAccountType type;

	@Builder
	public FinAccountEntity(String number, FinAccountStatus status, FinAccountType type){
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
