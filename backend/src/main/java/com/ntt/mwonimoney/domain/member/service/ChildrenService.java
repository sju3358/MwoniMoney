package com.ntt.mwonimoney.domain.member.service;

public interface ChildrenService {

	void addParent(Long parentIdx, Long childIdx);

	void getChildren(Long parentIdx);

	void getChildInfo(Long childIdx);

	void removeChild(Long childIdx);

}
