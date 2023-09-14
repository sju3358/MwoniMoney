package com.ntt.wannabee.domain.member.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChildrenDto {

	private Long parentIdx;
	private Long childUIdx;
}
