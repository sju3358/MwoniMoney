package com.ntt.mwonimoney.domain.account.api.v1;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.account.api.response.LoanTotalResponse;
import com.ntt.mwonimoney.domain.account.entity.Loan;
import com.ntt.mwonimoney.domain.account.entity.LoanStatus;
import com.ntt.mwonimoney.domain.account.entity.RepayLoanRequest;
import com.ntt.mwonimoney.domain.account.model.dto.CreateLoanRequest;
import com.ntt.mwonimoney.domain.account.model.dto.LoanListRequestDto;
import com.ntt.mwonimoney.domain.account.model.dto.LoanMemberType;
import com.ntt.mwonimoney.domain.account.model.dto.LoanTotalDto;
import com.ntt.mwonimoney.domain.account.service.LoanServiceImpl;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class LoanApi {

	private final JwtTokenProvider jwtTokenProvider;
	private final MemberAuthService memberAuthService;
	private final MemberService memberService;
	private final LoanServiceImpl loanService;

	@GetMapping("/loans")
	public ResponseEntity getLoanList(@RequestHeader("Authorization") String accessToken,
		LoanListRequestDto loanListRequestDto) {
		LoanMemberType loanMemberType = loanListRequestDto.getLoanMemberType();

		Long childIdx = null;

		// 돈 빌려준 사람(부모)의 경우
		if (loanMemberType == LoanMemberType.LENDER) {
			childIdx = memberService.getMemberIdx(loanListRequestDto.getChildUUID());
		} else {
			String childUUID = jwtTokenProvider.getMemberUUID(accessToken);
			childIdx = memberAuthService.getMemberAuthInfo(childUUID).getMemberIdx();
		}

		Pageable pageable = PageRequest.of(loanListRequestDto.getPage(), loanListRequestDto.getSize());
		Slice<Loan> loanList = loanService.findByBorrowerAndStatus(childIdx,
			loanListRequestDto.getLoanListRequestStatus(), pageable);

		return ResponseEntity.ok().body(loanList);
	}

	@GetMapping("/loans/{loanIdx}")
	public ResponseEntity getLoan(@RequestHeader("Authorization") String accessToken, @PathVariable Long loanIdx) {
		Loan loan = loanService.findById(loanIdx).orElseThrow();
		return ResponseEntity.ok().body(loan);
	}

	@PostMapping("/loans")
	public ResponseEntity createLoan(@RequestHeader("Authorization") String accessToken,
		@RequestBody CreateLoanRequest createLoanRequest) {
		String parentUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long parentIdx = memberAuthService.getMemberAuthInfo(parentUUID).getMemberIdx();
		//        Long childIdx = memberAuthService.getMemberAuthInfo(createLoanRequest.getBorrowerUUID()).getMemberIdx();
		Long childIdx = memberService.getMemberIdx(createLoanRequest.getBorrowerUUID());
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
		@RequestBody RepayLoanRequest repayLoanRequest) {
		int payment = repayLoanRequest.getPayment();

		Loan loanToRepay = loanService.findById(loanIdx).orElseThrow();

		// 이미 완료한 경우
		if (loanToRepay.getStatus() == LoanStatus.PAID) {
			return ResponseEntity.internalServerError().build();
		}

		int newBalance = loanToRepay.getBalance() - payment;
		LoanStatus newStatus = loanToRepay.getStatus();
		if (newBalance <= 0) {
			newBalance = 0;
			newStatus = LoanStatus.PAID;
		}
		loanService.changeStatus(loanToRepay, newStatus);
		loanService.changeBalance(loanToRepay, newBalance);
		return ResponseEntity.ok().build();
	}

	@PatchMapping("/loans/approval/{loanIdx}")
	public ResponseEntity approveLoan(@RequestHeader("Authorization") String accessToken, @PathVariable Long loanIdx) {
		Loan loanToApprove = loanService.findById(loanIdx).orElseThrow();
		loanService.changeStatus(loanToApprove, LoanStatus.APPROVAL);
		return ResponseEntity.ok().build();
	}

	@PatchMapping("/loans/rejection/{loanIdx}")
	public ResponseEntity rejectLoan(@RequestHeader("Authorization") String accessToken, @PathVariable Long loanIdx) {
		Loan loanToReject = loanService.findById(loanIdx).orElseThrow();
		loanService.changeStatus(loanToReject, LoanStatus.REJECTION);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/loans/total")
	public ResponseEntity getLoanTotal(@RequestHeader("Authorization") String accessToken,
		@RequestParam("childUuid") String childUuid) {

		Long memberIdx = 0L;
		if (childUuid.equals("none")) {
			String memberUuid = jwtTokenProvider.getMemberUUID(accessToken);

			memberIdx = memberAuthService.getMemberAuthInfo(memberUuid).getMemberIdx();
		} else {
			memberIdx = memberService.getMemberIdx(childUuid);
		}

		LoanTotalDto loanTotalDto = loanService.getSumAmount(memberIdx);

		LoanTotalResponse loanTotalResponse = LoanTotalResponse.builder()
			.totalAmount(loanTotalDto.getTotalAmount())
			.totalInterest(loanTotalDto.getTotalInterest())
			.avgInterest(loanTotalDto.getAvgInterest())
			.build();

		return ResponseEntity.ok().body(loanTotalResponse);
	}
}
