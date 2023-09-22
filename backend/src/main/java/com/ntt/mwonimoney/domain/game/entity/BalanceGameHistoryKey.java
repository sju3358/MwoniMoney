package com.ntt.mwonimoney.domain.game.entity;

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

	@Column(name = "history_balance_idx")
	private Long BalanceGameIdx;

	@Column(name = "hisotry_member_idx")
	private Long memberIdx;
}
