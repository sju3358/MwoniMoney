package com.ntt.mwonimoney.global.common.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class CommonEntity {

	@Column(name = "create_time")
	private LocalDateTime createTime;
}
