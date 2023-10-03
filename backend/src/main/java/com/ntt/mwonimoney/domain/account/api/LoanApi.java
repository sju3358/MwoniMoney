package com.ntt.mwonimoney.domain.account.api;

import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import com.ntt.mwonimoney.domain.account.model.dto.CreateLoanRequest;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestDto;
import com.ntt.mwonimoney.domain.account.model.dto.LoanMemberType;
import com.ntt.mwonimoney.domain.account.model.dto.PageToScroll;
import com.ntt.mwonimoney.domain.account.service.LoanService;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class LoanApi {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberAuthService memberAuthService;
    private final MemberService memberService;
    private final LoanService loanService;

    @GetMapping("/loans")
    public ResponseEntity getLoanList(@RequestHeader("Authorization") String accessToken, @RequestBody LoanListRequestDto loanListRequestDto, PageToScroll pageToScroll) {
        LoanMemberType loanMemberType = loanListRequestDto.getLoanMemberType();

        Long childIdx;

        // 돈 빌려준 사람(부모)의 경우
        if(loanMemberType == LoanMemberType.LENDER){
            childIdx = memberAuthService.getMemberAuthInfo(loanListRequestDto.getChildUUID()).getMemberIdx();
        }else{
            String childUUID = jwtTokenProvider.getMemberUUID(accessToken);
            childIdx = memberAuthService.getMemberAuthInfo(childUUID).getMemberIdx();
        }
        Pageable pageable = PageRequest.of(pageToScroll.getPage(), pageToScroll.getSize());
        Slice<Loan> loanList = loanService.findByBorrowerAndStatus(childIdx, loanListRequestDto.getLoanListRequestStatus(), pageable);

        return ResponseEntity.ok().body(loanList);
    }

    @GetMapping("/loans/{loanIdx}")
    public ResponseEntity getLoan(@RequestHeader("Authorization") String accessToken, @PathVariable Long loanIdx){
        Loan loan = loanService.findById(loanIdx).orElseThrow();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/loans")
    public ResponseEntity createLoan(@RequestHeader("Authorization") String accessToken, @RequestBody CreateLoanRequest createLoanRequest){
        String parentUUID = jwtTokenProvider.getMemberUUID(accessToken);
        Long parentIdx = memberAuthService.getMemberAuthInfo(parentUUID).getMemberIdx();
        Long childIdx = memberAuthService.getMemberAuthInfo(createLoanRequest.getBorrowerUUID()).getMemberIdx();

        // 1. loan 생성
        Loan loan = Loan.builder()
                .lender(parentIdx)
                .borrower(childIdx)
                .status(createLoanRequest.getStatus())
                .name(createLoanRequest.getName())
                .content(createLoanRequest.getContent())
                .amount(createLoanRequest.getAmount())
                .deadline(createLoanRequest.getDeadline())
                .rate(createLoanRequest.getRate())
                .build();
        loanService.save(loan);
        // 2. 부모 -> 자녀 이체
//        nhApiService.transfer();
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/loans/repay/{loanIdx}")
    public ResponseEntity repayLoan(@RequestHeader("Authorization") String accessToken,
                                    @PathVariable Long loanIdx,
                                    @RequestBody int payment){

        Loan loanToRepay = loanService.findById(loanIdx).orElseThrow();

        // 이미 완료한 경우
        if(loanToRepay.getStatus() == LoanStatus.PAID){
            return ResponseEntity.internalServerError().build();
        }

        int newAmount = loanToRepay.getAmount() - payment;
        LoanStatus newStatus = loanToRepay.getStatus();
        if(newAmount <= 0){
            newAmount = 0;
            newStatus = LoanStatus.PAID;
        }
        Loan repaidLoan = Loan
                .builder()
                .lender(loanToRepay.getLender())
                .borrower(loanToRepay.getBorrower())
                .status(newStatus)
                .name(loanToRepay.getName())
                .content(loanToRepay.getContent())
                .amount(newAmount)
                .deadline(loanToRepay.getDeadline())
                .build(); // 코드치기
        loanService.save(repaidLoan);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/loans/approval/{loanIdx}")
    public ResponseEntity approveLoan(@RequestHeader("Authorization") String accessToken, @PathVariable Long loanIdx){
        Loan loanToApprove = loanService.findById(loanIdx).orElseThrow();
        Loan approvedLoan = Loan
                .builder()
                .lender(loanToApprove.getLender())
                .borrower(loanToApprove.getBorrower())
                .status(LoanStatus.APPROVAL)
                .name(loanToApprove.getName())
                .content(loanToApprove.getContent())
                .amount(loanToApprove.getAmount())
                .deadline(loanToApprove.getDeadline())
                .build(); // 코드치기
        loanService.save(approvedLoan);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/loans/rejection/{loanIdx}")
    public ResponseEntity rejectLoan(@RequestHeader("Authorization") String accessToken, @PathVariable Long loanIdx){
        Loan loanToReject = loanService.findById(loanIdx).orElseThrow();
        Loan rejectedLoan = Loan
                .builder()
                .lender(loanToReject.getLender())
                .borrower(loanToReject.getBorrower())
                .status(LoanStatus.REJECTION)
                .name(loanToReject.getName())
                .content(loanToReject.getContent())
                .amount(loanToReject.getAmount())
                .deadline(loanToReject.getDeadline())
                .build(); // 코드치기
        loanService.save(rejectedLoan);
        return ResponseEntity.ok().build();
    }
}
