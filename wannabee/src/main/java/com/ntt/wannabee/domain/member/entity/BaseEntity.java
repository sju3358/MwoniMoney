package com.ntt.wannabee.domain.member.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
public class BaseEntity {
	@CreatedDate
	private LocalDateTime createdDate;

}
