package com.ntt.mwonimoney.domain.member.repository;

import com.ntt.mwonimoney.domain.member.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChildRepository extends JpaRepository<Child, Long> {
    Optional<Child> findByUuid(String memberUUID);
}
