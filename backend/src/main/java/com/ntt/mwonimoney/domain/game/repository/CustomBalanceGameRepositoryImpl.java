package com.ntt.mwonimoney.domain.game.repository;

import static com.ntt.mwonimoney.domain.game.entity.QBalanceGame.*;
import static com.ntt.mwonimoney.domain.game.entity.QBalanceGameHistory.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameDto;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameAnswer;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CustomBalanceGameRepositoryImpl implements CustomBalanceGameRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Optional<BalanceGameDto> findTodayBalanceGameDto() {
		BalanceGameDto balanceGameDto = jpaQueryFactory
			.select(Projections.bean(BalanceGameDto.class
				, balanceGame.idx
				, balanceGame.question
				, balanceGame.leftAnswer
				, balanceGame.rightAnswer
				, balanceGame.balanceGameStatus))
			.from(balanceGame)
			.where(balanceGame.balanceGameStatus.eq(BalanceGameStatus.RUNNING))
			.orderBy(balanceGame.createTime.desc())
			.limit(1)
			.fetchOne();

		if (balanceGameDto == null)
			return Optional.empty();

		int countOfLeftAnswer = getCountOfAnswer(BalanceGameAnswer.LEFT);
		int countOfRightAnswer = getCountOfAnswer(BalanceGameAnswer.RIGHT);

		balanceGameDto.setCountOfLeftAnswer(countOfLeftAnswer);
		balanceGameDto.setCountOfRightAnswer(countOfRightAnswer);

		return Optional.of(balanceGameDto);
	}

	@Override
	public Slice<BalanceGameDto> findSliceGamesBy(Pageable pageable) {
		List<BalanceGame> result = jpaQueryFactory
			.select(balanceGame)
			.from(balanceGame)
			.where(balanceGame.balanceGameStatus.ne(BalanceGameStatus.WAIT))
			.orderBy(balanceGame.createTime.desc())
			.offset(pageable.getPageNumber())
			.limit(pageable.getPageSize() + 1)
			.fetch();

		if (result.size() == 0)
			throw new NoSuchElementException("밸런스게임이 존재하지 않습니다");

		List<BalanceGameDto> balanceGames = new ArrayList<>();

		for (BalanceGame balanceGameEntity : result) {
			if (balanceGameEntity.getBalanceGameStatus().equals(BalanceGameStatus.RUNNING)) {
				BalanceGameDto dto = balanceGameEntity.convertToDto();
				dto.setCountOfRightAnswer(getCountOfAnswer(BalanceGameAnswer.RIGHT));
				dto.setCountOfRightAnswer(getCountOfAnswer(BalanceGameAnswer.LEFT));
				balanceGames.add(dto);
			}
		}

		for (BalanceGame balanceGameEntity : result) {
			if (balanceGameEntity.getBalanceGameStatus().equals(BalanceGameStatus.END)) {
				BalanceGameDto dto = balanceGameEntity.convertToDto();
				dto.setCountOfRightAnswer(getCountOfAnswer(BalanceGameAnswer.RIGHT));
				dto.setCountOfRightAnswer(getCountOfAnswer(BalanceGameAnswer.LEFT));
				balanceGames.add(dto);
			}
		}

		boolean hasNext = false;
		if (balanceGames.size() > pageable.getPageSize()) {
			balanceGames.remove(result.size() - 1);
			hasNext = true;
		}

		return new SliceImpl<>(balanceGames, pageable, hasNext);

	}

	@Override
	public Optional<BalanceGameDto> findBalanceGameDtoByIdx(Long idx) {

		BalanceGameDto balanceGameDto = jpaQueryFactory
			.select(Projections.bean(BalanceGameDto.class
				, balanceGame.idx
				, balanceGame.question
				, balanceGame.leftAnswer
				, balanceGame.rightAnswer
				, balanceGame.balanceGameStatus))
			.from(balanceGame)
			.where(balanceGame.idx.eq(idx))
			.fetchOne();

		if (balanceGameDto == null)
			return Optional.empty();

		int countOfLeftAnswer = getCountOfAnswer(BalanceGameAnswer.LEFT);
		int countOfRightAnswer = getCountOfAnswer(BalanceGameAnswer.RIGHT);

		balanceGameDto.setCountOfLeftAnswer(countOfLeftAnswer);
		balanceGameDto.setCountOfRightAnswer(countOfRightAnswer);

		return Optional.of(balanceGameDto);
	}

	private int getCountOfAnswer(BalanceGameAnswer answer) {
		return jpaQueryFactory
			.select(balanceGameHistory)
			.from(balanceGameHistory)
			.where(balanceGameHistory.selectAnswer.eq(answer))
			.fetch().size();
	}

}
