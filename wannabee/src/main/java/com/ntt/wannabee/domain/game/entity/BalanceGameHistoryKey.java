package com.ntt.wannabee.domain.game.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BalanceGameHistoryKey implements Serializable {

	@Column(name = "balance_idx")
	private Long balanceGameIdx;
	
	@Column(name = "member_uuid")
	private String memberUUID;
}
