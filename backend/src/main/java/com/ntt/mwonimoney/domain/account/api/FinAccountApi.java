package com.ntt.mwonimoney.domain.account.api;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ntt.mwonimoney.domain.account.service.FinAccountService;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FinAccountApi {

    private final FinAccountService finAccountService;
    private final MemberAuthService memberAuthService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/accounts")
    public ResponseEntity getFinAccountList(@RequestHeader("Authorization") String accessToken) {
        // 1. 사용자 정보를 body에서 꺼냄
        String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
        Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();

        // 2. 사용자의 계좌 목록을 조회
        List<FinAccount> finAccountList = finAccountService.getFinAccountByMember(memberIdx);

        return ResponseEntity.ok().body(finAccountList);
    }

    @GetMapping("/accounts/{finAccountIdx}")
    public ResponseEntity getFinAccountInfo(@PathVariable Long finAccountIdx){
        // 1. finAccountIdx로 finAccount 정보 불러오기
        return ResponseEntity.ok().build();
    }

    @PostMapping("/accounts")
    public ResponseEntity makeFinAccount(){
        // 1. NHDevelopers에서 핀-어카운트 직접 발급 API로 핀어카운트를 발급
        // 생년월일과 계좌번호(사용자로부터 입력은 받지만 실제로 사용X) 필요
        
        // 2. FinAccount에 저장
        
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/accounts/{finAccountIdx}")
    public ResponseEntity deleteFinAccount(@PathVariable Long finAccountIdx){
        // 1. finAccountIdx로 FinAccount 삭제
        return ResponseEntity.ok().build();
    }

    @PostMapping("/accounts/transfer")
    public ResponseEntity transfer(){
        // 1. NHDevelopers에서 간편결제>출금이체 API를 통해 고객 계좌에서 핀테크 기업 약정 계좌로 출금

        // 2. NHDevelopers에서 간편결제>농협입금이체 API를 통해 핀테크 기업 약정 계좌에서 고객 계좌로 출금
       return ResponseEntity.ok().build();
    }

    @GetMapping("/accounts/{finAccountIdx}/transactions")
    public ResponseEntity getFinAccountTransactionList(){
        // 1. finAccountIdx를 통해 FinAccount를 조회 -> 계좌번호를 불러옴

        // 2. NHDevelopers에서 간편결제>거래내역조회 API를 통해 조회
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/accounts/{finAccountIdx}/transactions/{transactionIdx}")
    public ResponseEntity updateFinAccountTransaction(){
        // 1. finAccountIdx와 transactionIdx를 통해 내용 수정

        return ResponseEntity.ok().build();
    }
}
