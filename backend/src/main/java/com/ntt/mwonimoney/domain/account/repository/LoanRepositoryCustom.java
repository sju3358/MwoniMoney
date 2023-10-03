package com.ntt.mwonimoney.domain.account.repository;

import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestDto;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.Optional;

@Transactional
public interface LoanRepositoryCustom {
}
