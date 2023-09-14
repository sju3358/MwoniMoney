package com.ntt.wannabee.domain.game.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Document(collection = "chat")
public class Chat {

	@Id
	private String id;

	private String senderNickname;

	private String message;

	private String senderUUID;

	private Long balanceGameIdx;

	private LocalDateTime createdTime;
}
