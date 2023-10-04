package com.ntt.mwonimoney.domain.game.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;

public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long>, CustomBalanceGameRepository {

	Optional<BalanceGame> findBalanceGameByIdx(Long idx);

}
