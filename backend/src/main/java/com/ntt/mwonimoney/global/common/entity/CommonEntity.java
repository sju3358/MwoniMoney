package com.ntt.mwonimoney.global.common.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class CommonEntity {

	@CreatedDate
	@Column(name = "create_time", updatable = false)
	private LocalDateTime createTime;
}
