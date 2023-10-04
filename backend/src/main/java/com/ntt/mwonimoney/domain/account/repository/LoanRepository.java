package com.ntt.mwonimoney.domain.account.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.entity.LoanStatus;

import jakarta.transaction.Transactional;

@Transactional
public interface LoanRepository extends JpaRepository<Loan, Long>, LoanRepositoryCustom {
	Slice<Loan> findByStatusAndLender(LoanStatus status, Long lender, Pageable pageable);

	Slice<Loan> findByStatusAndBorrower(LoanStatus status, Long borrower, Pageable pageable);

	Slice<Loan> findByStatus(LoanStatus status, Pageable pageable);

	Slice<Loan> findByLender(Long lender, Pageable pageable);

	@Query("SELECT l FROM Loan l WHERE l.status <> 'PAID' AND l.borrower = :borrower")
	Slice<Loan> findByBorrower(Long borrower, Pageable pageable);

	List<Loan> findAllByBorrower(Long borrower);
}
