package com.ntt.mwonimoney.domain.account.service.v2;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ntt.mwonimoney.domain.account.model.dto.GetTransactionResponseDto;
import com.ntt.mwonimoney.domain.account.model.dtoV2.GetTransactionRequestDto;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.account.repository.FinAccountTransactionRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.service.FinAccountTransactionalService;

import lombok.RequiredArgsConstructor;

@Service(value = "FinAccountTransactionServiceV2")
@RequiredArgsConstructor
public class FinAccountTransactionServiceImplV2 {

    private final FinAccountTransactionRepository finAccountTransactionRepository;
    public List<GetTransactionResponseDto> getTransaction(Long memberIdx, GetTransactionRequestDto getTransactionRequestDto) {

        List<FinAccountTransaction> result = finAccountTransactionRepository.getTransaction(memberIdx, getTransactionRequestDto);

        return result.stream().map(transaction -> GetTransactionResponseDto.builder()
                .time(transaction.getTime())
                .money(transaction.getMoney())
                .balance(transaction.getBalance())
                .memo(transaction.getMemo()).build()
        ).collect(Collectors.toList());
    }

}
