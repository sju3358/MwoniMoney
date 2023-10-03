package com.ntt.mwonimoney.domain.account.repository;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class LoanRepositoryCustomImpl implements LoanRepositoryCustom{
    private final EntityManager em;
}
