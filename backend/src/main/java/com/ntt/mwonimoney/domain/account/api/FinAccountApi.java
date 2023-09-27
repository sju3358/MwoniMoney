package com.ntt.mwonimoney.domain.account.api;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.service.FinAccountService;
import com.ntt.mwonimoney.domain.game.api.request.BalanceGameListRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FinAccountApi {

    private final FinAccountService finAccountService;

    @GetMapping("")
    public ResponseEntity getFinAccountList() {



        return ResponseEntity.ok().build();
    }

}
