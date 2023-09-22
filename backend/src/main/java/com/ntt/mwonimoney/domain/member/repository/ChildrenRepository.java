package com.ntt.mwonimoney.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ntt.mwonimoney.domain.member.entity.Children;
import com.ntt.mwonimoney.domain.member.entity.ChildrenKey;

public interface ChildrenRepository extends JpaRepository<Children, ChildrenKey> {
	
}
