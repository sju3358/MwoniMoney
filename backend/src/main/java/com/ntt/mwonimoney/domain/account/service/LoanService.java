package com.ntt.mwonimoney.domain.account.service;

import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestDto;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestStatus;
import com.ntt.mwonimoney.domain.account.model.dto.MemberType;
import com.ntt.mwonimoney.domain.account.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoanService {

    private final LoanRepository loanRepository;

    public Slice<Loan> findByMemberTypeAndStatus(LoanListRequestDto loanListRequestDto, Pageable pageable) {
        MemberType memberType = loanListRequestDto.getMemberType();
        LoanListRequestStatus loanListRequestStatus = loanListRequestDto.getLoanListRequestStatus();
        LoanStatus loanStatus = convertLoanListRequestStatusToLoanStatus(loanListRequestStatus);

        if(memberType == MemberType.BORROWER){
            if(loanListRequestStatus != LoanListRequestStatus.GENERAL){
                return loanRepository.findByStatusAndBorrower(loanStatus, loanListRequestDto.getMemberIdx(), pageable);
            }else{
                return loanRepository.findByBorrower(loanListRequestDto.getMemberIdx(), pageable);
            }
        }else{
            if(loanListRequestStatus != LoanListRequestStatus.GENERAL){
                return loanRepository.findByStatusAndLender(loanStatus, loanListRequestDto.getMemberIdx(), pageable);
            }else{
                return loanRepository.findByLender(loanListRequestDto.getMemberIdx(), pageable);
            }
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
}