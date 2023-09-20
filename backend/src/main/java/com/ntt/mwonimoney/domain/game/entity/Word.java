package com.ntt.mwonimoney.domain.game.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "word")
public class Word {

	@Id
	private String id;

	private Long balanceGameIdx;

	private String word;

	private Long count;
}