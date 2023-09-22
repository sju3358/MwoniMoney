package com.ntt.mwonimoney.domain.game.repository;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Repository;


import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameAnswer;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;
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
	public Optional<BalanceGameDto> findTodayBalanceGameDto() {
		BalanceGameDto balanceGameDto = jpaQueryFactory
			.select(Projections.bean(BalanceGameDto.class
				,balanceGame.idx
				,balanceGame.question
				,balanceGame.leftAnswer
				,balanceGame.rightAnswer
				,balanceGame.balanceGameStatus))
			.from(balanceGame)
			.where(balanceGame.balanceGameStatus.eq(BalanceGameStatus.RUNNING))
			.orderBy(balanceGame.createTime.desc())
			.limit(1)
			.fetchOne();

		if(balanceGameDto == null)
			return Optional.empty();

		int countOfLeftAnswer = getCountOfAnswer(BalanceGameAnswer.LEFT);
		int countOfRightAnswer = getCountOfAnswer(BalanceGameAnswer.RIGHT);

		balanceGameDto.setCountOfLeftAnswer(countOfLeftAnswer);
		balanceGameDto.setCountOfRightAnswer(countOfRightAnswer);

		return Optional.of(balanceGameDto);
	}

	@Override
	public Optional<BalanceGameDto> findBalanceGameDtoByIdx(Long idx) {

		BalanceGameDto balanceGameDto = jpaQueryFactory
			.select(Projections.bean(BalanceGameDto.class
				,balanceGame.idx
				,balanceGame.question
				,balanceGame.leftAnswer
				,balanceGame.rightAnswer
				,balanceGame.balanceGameStatus))
			.from(balanceGame)
			.where(balanceGame.idx.eq(idx))
			.fetchOne();

		if(balanceGameDto == null)
			return Optional.empty();

		int countOfLeftAnswer = getCountOfAnswer(BalanceGameAnswer.LEFT);
		int countOfRightAnswer = getCountOfAnswer(BalanceGameAnswer.RIGHT);

		balanceGameDto.setCountOfLeftAnswer(countOfLeftAnswer);
		balanceGameDto.setCountOfRightAnswer(countOfRightAnswer);

		return Optional.of(balanceGameDto);
	}

	private int getCountOfAnswer(BalanceGameAnswer answer){
		return jpaQueryFactory
			.select(balanceGameHistory)
			.from(balanceGameHistory)
			.where(balanceGameHistory.selectAnswer.eq(answer))
			.fetch().size();
	}


}
