package com.ntt.mwonimoney.domain.account.api.v1;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ntt.mwonimoney.domain.account.api.request.BncdType;
import com.ntt.mwonimoney.domain.account.api.request.DrtrRgynStatus;
import com.ntt.mwonimoney.domain.account.api.request.NHApiCheckOpenFinAccountDirectRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiDrawingTransferRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiOpenFinAccountDirectRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiReceivedTransferAccountNumberRequest;
import com.ntt.mwonimoney.domain.account.api.request.NHApiRequestHeader;
import com.ntt.mwonimoney.domain.account.api.response.FinAccountResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiCheckOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.api.response.NHApiOpenFinAccountDirectResponse;
import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.entity.QFinAccount;
import com.ntt.mwonimoney.domain.account.entity.QFinAccountTransaction;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionDto2;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionListRequest;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransactionListRequestType;
import com.ntt.mwonimoney.domain.account.model.dto.FinAccountTransferRequest;
import com.ntt.mwonimoney.domain.account.repository.FinAccountTransactionRepository;
import com.ntt.mwonimoney.domain.account.service.NHApiService;
import com.ntt.mwonimoney.domain.account.service.SmallAccountService;
import com.ntt.mwonimoney.domain.account.service.v1.FinAccountServiceImpl;
import com.ntt.mwonimoney.domain.account.service.v1.FinAccountTransactionServiceImpl;
import com.ntt.mwonimoney.domain.member.api.request.SmallAccountRequest;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.model.vo.SmallAccount;
import com.ntt.mwonimoney.domain.member.service.ChildService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.domain.member.util.S3Manager;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FinAccountApi {

	private final S3Manager s3Manager;

	private final MemberAuthService memberAuthService;
	private final MemberService memberService;
	private final JwtTokenProvider jwtTokenProvider;
	private final ChildService childService;

	private final NHApiService nhApiService;
	private final FinAccountServiceImpl finAccountService;
	private final FinAccountTransactionServiceImpl finAccountTransactionService;
	private final FinAccountTransactionRepository finAccountTransactionRepository;
	private final JPAQueryFactory queryFactory;
	private final SmallAccountService smallAccountService;

	@GetMapping("/accounts")
	public ResponseEntity getFinAccount(@RequestHeader("Authorization") String accessToken,
		@RequestParam(name = "type", required = true) String type) {
		//        // 1. 사용자 정보를 body에서 꺼냄
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		FinAccountType finAccountType = FinAccountType.valueOf(type);
		FinAccount finAccount;
		//        // 2. 사용자의 계좌를 조회
		if (finAccountType == FinAccountType.GENERAL) {
			finAccount = finAccountService.getFinAccount(memberIdx, FinAccountType.GENERAL,
				FinAccountStatus.ACTIVATE).orElseThrow();
		} else {
			finAccount = finAccountService.getFinAccount(memberIdx, FinAccountType.SMALL,
				FinAccountStatus.ACTIVATE).orElseThrow();
		}

		List<FinAccountTransactionDto> finAccountTransactionDtos = finAccountTransactionRepository.findFinAccountTransactionByFinAccountIdx(
			finAccount.getIdx());

		FinAccountResponse finAccountResponse = new FinAccountResponse();

		finAccountResponse.setRemain(finAccount.getRemain());
		finAccountResponse.setNumber(finAccount.getNumber());
		finAccountResponse.setCreatedDay(finAccount.getCreateTime().toLocalDate());
		finAccountResponse.setStatus(finAccount.getStatus().toString());
		finAccountResponse.setFinAccountTransactionDtos(finAccountTransactionDtos);

		return ResponseEntity.ok().body(finAccountResponse);
	}

	@PostMapping("/accounts")
	public ResponseEntity openFinAccount(@RequestHeader("Authorization") String accessToken,
		@RequestBody String accountNumber) {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		MemberDto memberInfo = memberService.getMemberInfo(memberIdx);

		// 1. 계좌가 있는 경우 error
		Optional<FinAccount> finAccount = finAccountService.getFinAccount(memberIdx,
			FinAccountType.GENERAL, FinAccountStatus.ACTIVATE);
		if (finAccount.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}

		// 2. 계좌가 없는 경우 save
		// 2-1. NHDevelopers 핀어카운트 등록번호 발급(핀-어카운트 직접발급)
		NHApiRequestHeader openFinAccountDirectRequestHeader = NHApiRequestHeader.builder()
			.ApiNm("OpenFinAccountDirect")
			.IsTuno(nhApiService.istunoGenerator())
			.build();

		NHApiOpenFinAccountDirectRequest openFinAccountDirectRequest = NHApiOpenFinAccountDirectRequest.builder()
			.requestHeader(openFinAccountDirectRequestHeader)
			.DrtrRgyn(DrtrRgynStatus.Y)
			//				.BrdtBmo(memberInfo.getBirthday().replace("-", ""))
			.BrdtBmo("19980813")
			.Bncd(BncdType.TYPE_011.getValue()) // 농협은행으로 고정
			//				.Acno(accountNumber)
			.Acno("3020000008999")
			.build();

		NHApiOpenFinAccountDirectResponse openFinAccountDirectResponse = nhApiService.getCheckOpenFinAccountDirect(
			openFinAccountDirectRequest);

		// 2-2.NHDevelopers 핀어카운트(핀-어카운트 직접 발급 확인)
		NHApiRequestHeader checkOpenFinAccountDirectHeader = NHApiRequestHeader.builder()
			.ApiNm("CheckOpenFinAccountDirect")
			.IsTuno(nhApiService.istunoGenerator())
			.build();

		NHApiCheckOpenFinAccountDirectRequest checkOpenFinAccountDirectRequest = NHApiCheckOpenFinAccountDirectRequest.builder()
			.requestHeader(checkOpenFinAccountDirectHeader)
			.Rgno(openFinAccountDirectResponse.getRgno())
			//                .BrdtBmo(memberInfo.getBirthday())
			.BrdtBmo("19980813")
			.build();

		NHApiCheckOpenFinAccountDirectResponse checkOpenFinAccountDirectResponse = nhApiService.getcheckOpenFinAccountDirect(
			checkOpenFinAccountDirectRequest);

		// 2-3. 계좌 저장
		FinAccount newFinAccount = null;
		if (checkOpenFinAccountDirectResponse.getFinAcno() != null) {
			newFinAccount = FinAccount.builder()
				//				                .number("3020000008999")
				.number(accountNumber)
				.finAcno(checkOpenFinAccountDirectResponse.getFinAcno())
				.status(FinAccountStatus.ACTIVATE)
				.type(FinAccountType.GENERAL)
				.build();
		} else {
			newFinAccount = FinAccount.builder()
				.number(accountNumber)
				.finAcno("00820100020640000000000016235")
				.status(FinAccountStatus.ACTIVATE)
				.type(FinAccountType.GENERAL)
				.build();
		}

		finAccountService.openFinAccount(newFinAccount, memberIdx);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/accounts/small-account")
	public ResponseEntity openSmallAccount(@RequestHeader("Authorization") String accessToken,
		@RequestPart(value = "info") SmallAccountRequest request,
		@RequestPart(value = "image") MultipartFile file) throws IOException {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		String goalImageUrl = s3Manager.saveGoalImage(file)[1];
		SmallAccount smallAccount = childService.addSmallAccountInfo(
			memberIdx,
			request.getGoalMoney(),
			request.getGoalName(),
			goalImageUrl,
			request.getSaveRatio());

		MemberDto memberInfo = memberService.getMemberInfo(memberIdx);

		// 1. 계좌가 있는 경우 error
		Optional<FinAccount> smallAccountBefo = finAccountService.getFinAccount(memberIdx,
			FinAccountType.SMALL, FinAccountStatus.ACTIVATE);
		if (smallAccountBefo.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}

		// 2. 계좌가 없는 경우 save
		// 2-1. 예치금 관리용 가상계좌 발급
		//		NHApiRequestHeader openVirtualAccountHeader = NHApiRequestHeader.builder()
		//			.ApiNm("OpenVirtualAccount")
		//			.IsTuno(nhApiService.istunoGenerator())
		//			.build();
		//
		//		NHOpenVirtualAccountRequest openVirtualAccountRequest = NHOpenVirtualAccountRequest.builder()
		//			.requestHeader(openVirtualAccountHeader)
		//			.Dpnm(memberInfo.getName())
		//			.build();
		//
		//		NHOpenVirtualAccountResponse openVirtualAccountResponse = nhApiService.getOpenVirtualAccount(
		//			openVirtualAccountRequest);

		// 2-2. 짜금통 계좌로 저장
		FinAccount finAccount = FinAccount.builder()
			//				.number(openVirtualAccountResponse.getVran())
			//				.finAcno("")
			.status(FinAccountStatus.ACTIVATE)
			.type(FinAccountType.SMALL)
			.build();

		finAccountService.openFinAccount(finAccount, memberIdx);

		return ResponseEntity.ok().build();
	}

	@PatchMapping("/accounts/small-account/{finAccountIdx}")
	public ResponseEntity closeSmallAccount(@PathVariable Long finAccountIdx) {

		smallAccountService.closeSmallAccount(finAccountIdx);

		return ResponseEntity.ok().build();
	}

	@PostMapping("/accounts/transfer")
	public ResponseEntity transferMoney(@RequestHeader("Authorization") String accessToken,
		@RequestBody FinAccountTransferRequest finAccountTransferRequest) {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long senderIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		// 1. 송금자 finAccount를 찾는다., 없는 경우 error
		FinAccount senderFinAccount = finAccountService.getFinAccount(senderIdx,
				FinAccountType.GENERAL, FinAccountStatus.ACTIVATE)
			.orElseThrow();

		// 2. 수취인 finAccount를 찾는다., 없는 경우 error
		FinAccount receiverFinAccount = finAccountService.getFinAccount(
				finAccountTransferRequest.getReceiverIdx(), FinAccountType.GENERAL, FinAccountStatus.ACTIVATE)
			.orElseThrow();

		// 3. NHDevelopers의 출금이체 -> 농협입금이체
		// 3-1. 출금이체
		NHApiRequestHeader drawingTransferHeader = NHApiRequestHeader.builder()
			.ApiNm("DrawingTransfer")
			.IsTuno(nhApiService.istunoGenerator())
			.build();
		NHApiDrawingTransferRequest drawingTransferRequest = NHApiDrawingTransferRequest.builder()
			.requestHeader(drawingTransferHeader)
			.FinAcno(senderFinAccount.getFinAcno())
			.Tram(Integer.toString(finAccountTransferRequest.getPrice()))
			.DractOtlt(finAccountTransferRequest.getSenderContent())
			.MractOtlt(finAccountTransferRequest.getReceiverContent())
			.build();

		NHApiRequestHeader receivedTransferAccountNumberHeader = NHApiRequestHeader.builder()
			.ApiNm("ReceivedTransferAccountNumber")
			.IsTuno(nhApiService.istunoGenerator())
			.build();
		NHApiReceivedTransferAccountNumberRequest receivedTransferAccountNumberRequest = NHApiReceivedTransferAccountNumberRequest.builder()
			.requestHeader(receivedTransferAccountNumberHeader)
			.bncdType(BncdType.TYPE_011)
			.Acno(senderFinAccount.getNumber())
			.Tram(Integer.toString(finAccountTransferRequest.getPrice()))
			.DractOtlt(finAccountTransferRequest.getSenderContent())
			.MractOtlt(finAccountTransferRequest.getReceiverContent())
			.build();

		nhApiService.transfer(drawingTransferRequest, receivedTransferAccountNumberRequest);

		FinAccountTransaction finAccountTransaction = FinAccountTransaction.builder()
			//			                .money()
			//			                .balance()
			//			                .memo()
			//			                .time()
			.build();
		finAccountTransactionService.makeTransaction(finAccountTransaction);

		return ResponseEntity.ok().build();
	}

	//	@GetMapping("/accounts/transactions")
	//	public ResponseEntity getTransactionList(@RequestHeader("Authorization") String accessToken,
	//											 FinAccountTransactionListRequest request) {
	//		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
	//		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
	//
	//		FinAccountTransactionListRequestType type = request.getType();
	//		FinAccountType finAccountType = request.getFinAccountType();
	//
	//		Long finAccountIdx = finAccountService.getFinAccountByMemberAndTypeAndStatus(memberIdx, finAccountType,
	//				FinAccountStatus.ACTIVATE).orElseThrow().getIdx();
	//
	//		List<FinAccountTransaction> list = null;
	//
	//		if (type == FinAccountTransactionListRequestType.INCOME) {
	//			//			list = finAccountTransactionService.findByFinAccountIdxAndMoneyGreaterThanEqual(finAccountIdx, 0);
	//		} else if (type == FinAccountTransactionListRequestType.OUTCOME) {
	//			//			list = finAccountTransactionService.findByFinAccountIdxAndMoneyGreaterThanEqual(finAccountIdx, 0, pageable);
	//		} else {
	//			//			list = finAccountTransactionService.findByFinAccount(finAccountIdx, pageable);
	//		}
	//
	//		return ResponseEntity.ok().body(list);
	//	}

	@GetMapping("/accounts/transactions")
	public ResponseEntity<List<FinAccountTransactionDto2>> getTransactionList(
		@RequestHeader("Authorization") String accessToken, @RequestBody FinAccountTransactionListRequest request) {
		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

		FinAccountTransactionListRequestType type = request.getType();
		FinAccountType finAccountType = request.getFinAccountType();
		log.info("type = {}", type);
		log.info("finAccountType = {}", finAccountType);
		Long finAccountIdx = finAccountService.getFinAccount(memberIdx, finAccountType,
			FinAccountStatus.ACTIVATE).orElseThrow().getIdx();
		log.info("finAccountIdx = {}", finAccountIdx);

		List<FinAccountTransaction> list = null; // 초기화

		if (type == FinAccountTransactionListRequestType.GENERAL) {
			list = queryFactory
				.selectFrom(QFinAccountTransaction.finAccountTransaction)
				.where(
					QFinAccountTransaction.finAccountTransaction.finAccount.idx.eq(finAccountIdx)
						.and(QFinAccount.finAccount.type.eq(finAccountType))
				)
				.fetch();
		} else if (type == FinAccountTransactionListRequestType.INCOME) {
			list = queryFactory
				.selectFrom(QFinAccountTransaction.finAccountTransaction)
				.where(
					QFinAccountTransaction.finAccountTransaction.finAccount.idx.eq(finAccountIdx)
						.and(QFinAccount.finAccount.type.eq(finAccountType))
						.and(QFinAccountTransaction.finAccountTransaction.money.gt(0))
				)
				.fetch();
		} else if (type == FinAccountTransactionListRequestType.OUTCOME) {
			list = queryFactory
				.selectFrom(QFinAccountTransaction.finAccountTransaction)
				.where(
					QFinAccountTransaction.finAccountTransaction.finAccount.idx.eq(finAccountIdx)
						.and(QFinAccount.finAccount.type.eq(finAccountType))
						.and(QFinAccountTransaction.finAccountTransaction.money.lt(0))
				)
				.fetch();
		}

		List<FinAccountTransactionDto2> result = list.stream().map(transaction -> FinAccountTransactionDto2.builder()
				.money(transaction.getMoney())
				.balance(transaction.getBalance())
				.memo(transaction.getMemo())
				.time(transaction.getTime())
				.build())
			.collect(Collectors.toList());

		return ResponseEntity.ok().body(result);
	}

	@PatchMapping("/accounts/{finAccountIdx}/transactions/{transactionIdx}")
	public ResponseEntity updateTransaction(@PathVariable Long finAccountIdx, @PathVariable Long transactionIdx,
		@RequestBody String memoToUpdate) {
		FinAccountTransaction finAccountTransactionToUpdate = finAccountTransactionService.getTransaction(
				transactionIdx)
			.orElseThrow();

		finAccountTransactionService.editMemo(finAccountTransactionToUpdate, memoToUpdate);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/accounts/small-account/{finAccountIdx}/remain")
	public ResponseEntity getRemain(@PathVariable Long finAccountIdx) {
		Long remain = finAccountService.getBalance(finAccountIdx);
		return ResponseEntity.ok().body(remain);
	}

}
