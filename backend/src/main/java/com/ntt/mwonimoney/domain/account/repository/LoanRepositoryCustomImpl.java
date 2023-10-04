package com.ntt.mwonimoney.domain.account.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
public class LoanRepositoryCustomImpl implements LoanRepositoryCustom{
    private final EntityManager em;
}
