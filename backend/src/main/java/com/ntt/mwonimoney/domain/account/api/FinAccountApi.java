package com.ntt.mwonimoney.domain.account.api;

import com.ntt.mwonimoney.domain.account.api.request.*;
import com.ntt.mwonimoney.domain.account.api.response.*;
import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountStatus;
import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.*;
import com.ntt.mwonimoney.domain.account.service.FinAccountTransactionService;
import com.ntt.mwonimoney.domain.account.service.NHApiService;
import com.ntt.mwonimoney.domain.member.model.dto.MemberDto;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ntt.mwonimoney.domain.account.service.FinAccountService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FinAccountApi {

    private final MemberAuthService memberAuthService;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    private final NHApiService nhApiService;
    private final FinAccountService finAccountService;
    private final FinAccountTransactionService finAccountTransactionService;

    @GetMapping("/accounts")
    public ResponseEntity getFinAccount(@RequestHeader("Authorization") String accessToken, @RequestParam(name = "type", required = true) String type) {
//        // 1. 사용자 정보를 body에서 꺼냄
        String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
        Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

        FinAccountType finAccountType = FinAccountType.valueOf(type);

        Optional<FinAccount> finAccount = null;
//        // 2. 사용자의 계좌를 조회
        if(finAccountType == FinAccountType.GENERAL){
            finAccount = finAccountService.getFinAccountByMemberAndType(memberIdx, FinAccountType.GENERAL);
        }else{
            finAccount = finAccountService.getFinAccountByMemberAndType(memberIdx, FinAccountType.SMALL);
        }

        return ResponseEntity.ok().body(finAccount);
    }

    @PostMapping("/accounts")
    public ResponseEntity openFinAccount(@RequestHeader("Authorization") String accessToken, @RequestBody String accountNumber){
        String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
        Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

        MemberDto memberInfo = memberService.getMemberInfo(memberIdx);

        // 1. 계좌가 있는 경우 error
        Optional<FinAccount> finAccount = finAccountService.getFinAccountByMemberAndType(memberIdx, FinAccountType.GENERAL);
        if(finAccount.isPresent()){
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

        NHApiOpenFinAccountDirectResponse openFinAccountDirectResponse = nhApiService.getCheckOpenFinAccountDirect(openFinAccountDirectRequest);

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

        NHApiCheckOpenFinAccountDirectResponse checkOpenFinAccountDirectResponse = nhApiService.getcheckOpenFinAccountDirect(checkOpenFinAccountDirectRequest);

        // 2-3. 계좌 저장

        FinAccount newFinAccount = null;
        if(checkOpenFinAccountDirectResponse.getFinAcno() != null) {
            newFinAccount = FinAccount.builder()
//                .number("3020000008999")
                    .number(accountNumber)
                    .finAcno(checkOpenFinAccountDirectResponse.getFinAcno())
                    .status(FinAccountStatus.ACTIVATE)
                    .type(FinAccountType.GENERAL)
                    .build();
        }else{
            newFinAccount = FinAccount.builder()
                    .number(accountNumber)
                    .finAcno("00820100020640000000000016235")
                    .status(FinAccountStatus.ACTIVATE)
                    .type(FinAccountType.GENERAL)
                    .build();
        }
        finAccountService.save(newFinAccount);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/accounts/small-account")
    public ResponseEntity openSmallAccount(@RequestHeader("Authorization") String accessToken){
        String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
        Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

        MemberDto memberInfo = memberService.getMemberInfo(memberIdx);

        // 1. 계좌가 있는 경우 error
        Optional<FinAccount> smallAccountBefo = finAccountService.getFinAccountByMemberAndType(memberIdx, FinAccountType.SMALL);
        if(smallAccountBefo.isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // 2. 계좌가 없는 경우 save
        // 2-1. 예치금 관리용 가상계좌 발급
        NHApiRequestHeader openVirtualAccountHeader = NHApiRequestHeader.builder()
                .ApiNm("OpenVirtualAccount")
                .IsTuno(nhApiService.istunoGenerator())
                .build();

        NHOpenVirtualAccountRequest openVirtualAccountRequest = NHOpenVirtualAccountRequest.builder()
                .requestHeader(openVirtualAccountHeader)
                .Dpnm(memberInfo.getName())
                .build();

        NHOpenVirtualAccountResponse openVirtualAccountResponse = nhApiService.getOpenVirtualAccount(openVirtualAccountRequest);

        // 2-2. 짜금통 계좌로 저장
        FinAccount smallAccount = FinAccount.builder().build();
        finAccountService.save(smallAccount);

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/accounts/small-account/{finAccountIdx}")
    public ResponseEntity closeSmallAccount(@PathVariable Long finAccountIdx){
        finAccountService.closeSmallAccount();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/accounts/transfer")
    public ResponseEntity transferMoney(@RequestHeader("Authorization") String accessToken, @RequestBody FinAccountTransferRequest finAccountTransferRequest){
        String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
        Long senderIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

        // 1. 송금자 finAccount를 찾는다., 없는 경우 error
        FinAccount senderFinAccount = finAccountService.getFinAccountByMemberAndType(senderIdx, FinAccountType.GENERAL).orElseThrow();

        // 2. 수취인 finAccount를 찾는다., 없는 경우 error
        FinAccount receiverFinAccount = finAccountService.getFinAccountByMemberAndType(finAccountTransferRequest.getReceiverIdx(), FinAccountType.GENERAL).orElseThrow();

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
//                .money()
//                .balance()
//                .memo()
//                .time()
                .build();
        finAccountTransactionService.save(finAccountTransaction);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/accounts/{finAccountIdx}/transactions")
    public ResponseEntity getTransactionList(@PathVariable Long finAccountIdx, @RequestBody FinAccountTransactionListRequest request){
        FinAccountTransactionListRequestType type = request.getType();
        PageToScroll pageToScroll = request.getPageToScroll();

        Slice<FinAccountTransaction> list = null;
        Pageable pageable = PageRequest.of(pageToScroll.getPage(), pageToScroll.getSize());;

        if(type == FinAccountTransactionListRequestType.INCOME){
            list = finAccountTransactionService.findByFinAccountIdxAndMoneyGreaterThanEqual(finAccountIdx,0,pageable);
        }else if(type == FinAccountTransactionListRequestType.OUTCOME){
            list = finAccountTransactionService.findByFinAccountIdxAndMoneyGreaterThanEqual(finAccountIdx,0, pageable);
        }else{
            list = finAccountTransactionService.findByFinAccount(finAccountIdx, pageable);
        }

        return ResponseEntity.ok().body(list);
    }

    @PatchMapping("/accounts/{finAccountIdx}/transactions/{transactionIdx}")
    public ResponseEntity updateTransaction(@PathVariable Long finAccountIdx, @PathVariable Long transactionIdx, @RequestBody String memoToUpdate){
        FinAccountTransaction finAccountTransactionToUpdate = finAccountTransactionService.findById(transactionIdx).orElseThrow();

        FinAccountTransaction finAccountTransactionUpdated = FinAccountTransaction.builder()
                .id(finAccountTransactionToUpdate.getId())
                .money(finAccountTransactionToUpdate.getMoney())
                .balance(finAccountTransactionToUpdate.getBalance())
                .memo(memoToUpdate)
                .time(finAccountTransactionToUpdate.getTime())
                .build();
        finAccountTransactionUpdated.addFinAccount(finAccountTransactionToUpdate.getFinAccount());

        finAccountTransactionService.save(finAccountTransactionUpdated);

        return ResponseEntity.ok().build();
    }

}
