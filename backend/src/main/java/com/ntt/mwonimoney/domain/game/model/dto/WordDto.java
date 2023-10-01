package com.ntt.mwonimoney.domain.game.model.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WordDto {
	private String text;
	private Long value;
}
