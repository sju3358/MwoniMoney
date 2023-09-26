package com.ntt.mwonimoney.domain.game.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "word")
public class Word {

	@Id
	private String word;

	private Long count;

	private Long balanceGameIdx;

}