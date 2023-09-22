package com.ntt.mwonimoney.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Children;
import com.ntt.mwonimoney.domain.member.entity.ChildrenKey;

import io.lettuce.core.dynamic.annotation.Param;

public interface ChildrenRepository extends JpaRepository<Children, ChildrenKey> , CustomChildrenRepository{

	Optional<Children> findChildrenByChildrenKey(ChildrenKey childrenKey);

	List<Child> findChildrenByChildrenKey_ParentIdx(Long parentIdx);
}
