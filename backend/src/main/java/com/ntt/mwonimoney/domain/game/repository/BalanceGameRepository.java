package com.ntt.mwonimoney.domain.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.model.vo.BalanceGameStatus;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long>, CustomBalanceGameRepository {

	Optional<BalanceGame> findBalanceGameByIdx(Long idx);

	List<BalanceGame> findBalanceGamesByBalanceGameStatus(BalanceGameStatus status);

}
