package com.ntt.mwonimoney.domain.member.repository;

import java.util.Optional;

import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;

import io.lettuce.core.dynamic.annotation.Param;

public interface CustomChildrenRepository {

	Optional<ChildDto> findChild(Long parentIdx, Long childIdx);
}
