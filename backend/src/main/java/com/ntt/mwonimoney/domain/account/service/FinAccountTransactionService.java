package com.ntt.mwonimoney.domain.account.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FinAccountTransactionService {

    private final FinAccountTransactionService finAccountTransactionService;


}
