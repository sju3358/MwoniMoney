package com.ntt.mwonimoney.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.member.entity.Children;
import com.ntt.mwonimoney.domain.member.entity.ChildrenKey;


public interface ChildrenRepository extends JpaRepository<Children, ChildrenKey> , CustomChildrenRepository{

	Optional<Children> findChildrenByChildrenKey(ChildrenKey childrenKey);

}
