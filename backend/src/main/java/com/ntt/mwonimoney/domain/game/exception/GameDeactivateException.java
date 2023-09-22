package com.ntt.mwonimoney.domain.game.exception;

public class GameDeactivateException extends RuntimeException{

	public GameDeactivateException(String errorMessage){
		super(errorMessage);
	}
}
