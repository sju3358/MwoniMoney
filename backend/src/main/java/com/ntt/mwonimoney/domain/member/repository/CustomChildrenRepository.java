package com.ntt.mwonimoney.domain.member.repository;

import java.util.List;
import java.util.Optional;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Parent;

public interface CustomChildrenRepository {

	Optional<Child> findChild(String parentUUID, String ChildUUID);

	List<Parent> findParents(String childUUID);

	List<Child> findChildren(String parentUUID);
}
