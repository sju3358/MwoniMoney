package com.ntt.mwonimoney.domain.member.service;

import java.util.List;

import com.ntt.mwonimoney.domain.member.model.dto.ChildDto;

public interface ChildrenService {

	void addParent(String parentUUID, String childUUID);

	List<ChildDto> getChildren(String parentUUID);

	ChildDto getChildInfo(String parentUUID, String childUUID);

	void removeChild(String parentUUID, String childUUID);

}
