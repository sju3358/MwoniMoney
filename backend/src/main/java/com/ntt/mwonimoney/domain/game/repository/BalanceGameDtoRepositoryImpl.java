package com.ntt.mwonimoney.domain.game.repository;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Repository;


import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import static com.ntt.mwonimoney.domain.game.entity.QBalanceGame.balanceGame;
import static com.ntt.mwonimoney.domain.game.entity.QBalanceGameHistory.balanceGameHistory;

@Repository
@RequiredArgsConstructor
public class BalanceGameDtoRepositoryImpl implements BalanceGameDtoRepository{

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<BalanceGameDto> findBalanceGameDtoByIdx(Long idx) {

		BalanceGameDto balanceGameDto = jpaQueryFactory
			.select(Projections.bean(BalanceGameDto.class
				,balanceGame.idx
				,balanceGame.question
				,balanceGame.answer1
				,balanceGame.answer2
				,balanceGame.status))
			.from(balanceGame)
			.where(balanceGame.idx.eq(idx))
			.fetchOne();

		if(balanceGameDto == null)
			return Optional.empty();

		int countOfAnswer1 = jpaQueryFactory
			.select(balanceGameHistory)
			.from(balanceGameHistory)
			.where(balanceGameHistory.selectAnswer.eq(0))
			.fetch().size();

		int countOfAnswer2 = jpaQueryFactory
			.select(balanceGameHistory)
			.from(balanceGameHistory)
			.where(balanceGameHistory.selectAnswer.eq(1))
			.fetch().size();

		balanceGameDto.setCountOfAnswer1(countOfAnswer1);
		balanceGameDto.setCountOfAnswer2(countOfAnswer2);

		return Optional.of(balanceGameDto);
	}
}
