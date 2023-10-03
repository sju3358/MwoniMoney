package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestStatus;
import com.ntt.mwonimoney.domain.account.model.dto.LoanMemberType;
import com.ntt.mwonimoney.domain.account.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class LoanService {

    private final LoanRepository loanRepository;

    public Slice<Loan> findByMemberTypeAndStatus(LoanMemberType memberType, LoanListRequestStatus loanListRequestStatus, Long memberIdx, Pageable pageable) {
        LoanStatus loanStatus = convertLoanListRequestStatusToLoanStatus(loanListRequestStatus);

        if(memberType == LoanMemberType.BORROWER){
            if(loanListRequestStatus != LoanListRequestStatus.GENERAL){
                return loanRepository.findByStatusAndBorrower(loanStatus, memberIdx, pageable);
            }else{
                return loanRepository.findByBorrower(memberIdx, pageable);
            }
        }else{
            if(loanListRequestStatus != LoanListRequestStatus.GENERAL){
                return loanRepository.findByStatusAndLender(loanStatus, memberIdx, pageable);
            }else{
                return loanRepository.findByLender(memberIdx, pageable);
            }
        }
    }

    public Slice<Loan> findByBorrowerAndStatus(Long borrower, LoanListRequestStatus loanListRequestStatus, Pageable pageable){
        LoanStatus loanStatus = convertLoanListRequestStatusToLoanStatus(loanListRequestStatus);

        if(loanListRequestStatus != LoanListRequestStatus.GENERAL){
            return loanRepository.findByStatusAndBorrower(loanStatus, borrower, pageable);
        }else{
            return loanRepository.findByBorrower(borrower, pageable);
        }
    }

    public Optional<Loan> findById(Long loanIdx){
        return loanRepository.findById(loanIdx);
    }

    public Loan save(Loan loanToSave){
        return loanRepository.save(loanToSave);
    }

    public LoanStatus convertLoanListRequestStatusToLoanStatus(LoanListRequestStatus loanListRequestStatus){
        if(loanListRequestStatus == LoanListRequestStatus.APPROVAL) return LoanStatus.APPROVAL;
        else if(loanListRequestStatus == LoanListRequestStatus.REJECTION) return LoanStatus.REJECTION;
        else if(loanListRequestStatus == LoanListRequestStatus.WATING) return LoanStatus.WATING;
        return null;
    }

    public void changeStatus(Loan loan, LoanStatus status){
        loan.changeStatus(status);
    }

    public void changeAmount(Loan loan, int amount){
        loan.changeAmount(amount);
    }
}