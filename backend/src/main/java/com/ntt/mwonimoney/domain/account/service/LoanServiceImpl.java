package com.ntt.mwonimoney.domain.account.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestStatus;
import com.ntt.mwonimoney.domain.account.model.dto.LoanMemberType;
import com.ntt.mwonimoney.domain.account.model.dto.LoanTotalDto;
import com.ntt.mwonimoney.domain.account.repository.LoanRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LoanServiceImpl {

	private final LoanRepository loanRepository;

	public Slice<Loan> findByMemberTypeAndStatus(LoanMemberType memberType, LoanListRequestStatus loanListRequestStatus,
		Long memberIdx, Pageable pageable) {
		LoanStatus loanStatus = convertLoanListRequestStatusToLoanStatus(loanListRequestStatus);

		if (memberType == LoanMemberType.BORROWER) {
			if (loanListRequestStatus != LoanListRequestStatus.GENERAL) {
				return loanRepository.findByStatusAndBorrower(loanStatus, memberIdx, pageable);
			} else {
				return loanRepository.findByBorrower(memberIdx, pageable);
			}
		} else {
			if (loanListRequestStatus != LoanListRequestStatus.GENERAL) {
				return loanRepository.findByStatusAndLender(loanStatus, memberIdx, pageable);
			} else {
				return loanRepository.findByLender(memberIdx, pageable);
			}
		}
	}

	public Slice<Loan> findByBorrowerAndStatus(Long borrower, LoanListRequestStatus loanListRequestStatus,
		Pageable pageable) {
		LoanStatus loanStatus = convertLoanListRequestStatusToLoanStatus(loanListRequestStatus);

		if (loanListRequestStatus != LoanListRequestStatus.GENERAL) {
			return loanRepository.findByStatusAndBorrower(loanStatus, borrower, pageable);
		} else {
			return loanRepository.findByBorrower(borrower, pageable);
		}
	}

	public Optional<Loan> findById(Long loanIdx) {
		return loanRepository.findById(loanIdx);
	}

	public Loan save(Loan loanToSave) {
		return loanRepository.save(loanToSave);
	}

	public LoanStatus convertLoanListRequestStatusToLoanStatus(LoanListRequestStatus loanListRequestStatus) {
		if (loanListRequestStatus == LoanListRequestStatus.APPROVAL)
			return LoanStatus.APPROVAL;
		else if (loanListRequestStatus == LoanListRequestStatus.REJECTION)
			return LoanStatus.REJECTION;
		else if (loanListRequestStatus == LoanListRequestStatus.WATING)
			return LoanStatus.WATING;
		return null;
	}

	public void changeStatus(Loan loan, LoanStatus status) {
		loan.changeStatus(status);
	}

	public void changeBalance(Loan loan, int amount) {
		loan.changeBalacne(amount);
	}

	public LoanTotalDto getSumAmount(Long memberIdx) {
		List<Loan> loans = loanRepository.findAllByBorrower(memberIdx);

		Long totalAmount = 0L;
		Long totalInterest = 0L;
		Long totalBalance = 0L;
		Double totalRate = (double)0;
		int cnt = 0;

		for (Loan loan : loans) {
			cnt++;
			totalAmount += loan.getAmount();
			totalInterest += (long)(loan.getAmount() * loan.getRate());
			totalBalance += loan.getBalance();
			totalRate += loan.getRate();
		}

		Double avgInterest = totalRate / (double)cnt;

		LoanTotalDto loanTotalDto = LoanTotalDto.builder()
			.totalAmount(totalAmount)
			.totalInterest(totalInterest)
			.totalBalance(totalBalance)
			.avgInterest(avgInterest)
			.build();

		return loanTotalDto;
	}
}