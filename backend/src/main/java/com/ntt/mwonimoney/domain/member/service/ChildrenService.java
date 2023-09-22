package com.ntt.mwonimoney.domain.member.service;

import java.util.List;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;

public interface ChildrenService {

	void addParent(Long parentIdx, Long childIdx);

	List<ChildDto> getChildren(Long parentIdx);

	ChildDto getChildInfo(Long parentIdx, Long childIdx);

	void removeChild(Long parentIdx, Long childIdx);

}
