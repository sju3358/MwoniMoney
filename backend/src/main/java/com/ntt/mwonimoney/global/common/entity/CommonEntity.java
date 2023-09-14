package com.ntt.mwonimoney.global.common.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
public abstract class CommonEntity {

	@Column(name = "create_time")
	private LocalDateTime createTime;
}
