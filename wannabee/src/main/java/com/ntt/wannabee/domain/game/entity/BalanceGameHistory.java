package com.ntt.wannabee.domain.game.entity;

import com.ntt.wannabee.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.wannabee.domain.member.entity.Member;
import com.ntt.wannabee.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "balance_member")
public class BalanceGameHistory extends CommonEntity {

	@EmbeddedId
	private BalanceGameHistoryKey balanceGameHistoryKey;

	@Column(name = "selectAnswer")
	private byte selectAnswer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "balance_idx")
	private BalanceGame balanceGame;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_idx")
	private Member member;

	@Builder
	public BalanceGameHistory(Long balanceGameIdx, String memberUUID, byte selectAnswer, BalanceGame balanceGame,
		Member member) {
		this.balanceGameHistoryKey = new BalanceGameHistoryKey(balanceGameIdx, memberUUID);
		this.selectAnswer = selectAnswer;
		this.balanceGame = balanceGame;
		this.member = member;
	}

	public BalanceGameHistoryDto convertToDto() {
		return BalanceGameHistoryDto.builder()
			.balanceGameIdx(this.balanceGameHistoryKey.getBalanceGameIdx())
			.memberUUID(this.balanceGameHistoryKey.getMemberUUID())
			.selectAnswer(this.selectAnswer)
			.build();
	}
}
