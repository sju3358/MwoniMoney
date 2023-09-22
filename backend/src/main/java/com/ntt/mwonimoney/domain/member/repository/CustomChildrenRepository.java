package com.ntt.mwonimoney.domain.member.repository;

import java.util.List;
import java.util.Optional;

import com.ntt.mwonimoney.domain.member.entity.Child;

public interface CustomChildrenRepository {

	Optional<Child> findChild(String parentUUID, String ChildUUID);

	List<Child> findChildren(String parentUUID);
}
