package com.ntt.mwonimoney.domain.game.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;

public interface BalanceGameRepositoryV1 extends JpaRepository<BalanceGame, Long> {

	Optional<BalanceGame> findBalanceGameByIdx(Long idx);

	Optional<List<BalanceGame>> findBalanceGamesByActive(char active);

	List<BalanceGame> findAll();

}
