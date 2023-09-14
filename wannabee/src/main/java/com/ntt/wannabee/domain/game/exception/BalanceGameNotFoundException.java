package com.ntt.wannabee.domain.game.exception;

public class BalanceGameNotFoundException extends RuntimeException {

	public BalanceGameNotFoundException() {
		super("벨런스 게임을 찾을 수 없습니다.");
	}

	public BalanceGameNotFoundException(String message) {
		super(message);
	}
}
