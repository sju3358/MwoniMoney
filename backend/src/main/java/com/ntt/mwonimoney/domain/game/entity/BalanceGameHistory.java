package com.ntt.mwonimoney.domain.game.entity;

import com.ntt.mwonimoney.domain.game.exception.GameDeactivateException;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameAnswer;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.global.common.entity.CommonEntity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "history")
public class BalanceGameHistory extends CommonEntity {

	@EmbeddedId
	private BalanceGameHistoryKey balanceGameHistoryKey;

	@Enumerated(EnumType.STRING)
	@Column(name = "history_selectAnswer")
	private BalanceGameAnswer selectAnswer;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "balance_idx")
	private BalanceGame balanceGame;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_idx")
	private Member member;

	public void changeSelect(BalanceGameAnswer selectAnswer) {
		if (this.balanceGame.getBalanceGameStatus().equals(BalanceGameStatus.END))
			throw new GameDeactivateException("밸런스게임이 이미 종료되었습니다");
		this.selectAnswer = selectAnswer;
	}

	@Builder
	public BalanceGameHistory(BalanceGameAnswer selectAnswer, BalanceGame balanceGame, Member member) {
		this.balanceGameHistoryKey = new BalanceGameHistoryKey(balanceGame.getIdx(), member.getIdx());
		this.selectAnswer = selectAnswer;
		this.balanceGame = balanceGame;
		this.member = member;
	}

	public BalanceGameHistoryDto convertToDto() {
		return BalanceGameHistoryDto.builder()
			.balanceGameIdx(this.balanceGameHistoryKey.getBalanceGameIdx())
			.memberIdx(this.balanceGameHistoryKey.getMemberIdx())
			.selectAnswer(this.selectAnswer)
			.build();
	}
}
