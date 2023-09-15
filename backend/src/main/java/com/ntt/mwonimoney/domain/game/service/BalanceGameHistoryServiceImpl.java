package com.ntt.mwonimoney.domain.game.service;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.entity.BalanceGameHistory;
import com.ntt.mwonimoney.domain.game.model.dto.BalanceGameHistoryDto;
import com.ntt.mwonimoney.domain.game.repository.BalanceGameHistoryRepository;
import com.ntt.mwonimoney.domain.game.repository.BalanceGameRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class BalanceGameHistoryServiceImpl implements BalanceGameHistoryService {

    private final BalanceGameHistoryRepository balanceGameHistoryRepository;
    private final BalanceGameRepository balanceGameRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<BalanceGameHistoryDto> getUserBalanceGameHistories(Long memberIdx) {

        List<BalanceGameHistory> balanceGameHistoryEntities =
                balanceGameHistoryRepository.findBalanceGameHistoriesByBAndBalanceGameHistoryKey_MemberIdx(memberIdx)
                        .orElseThrow(() -> new NoSuchElementException("벨런스 게임 참여 기록이 없습니다."));

        List<BalanceGameHistoryDto> balanceGameHistories = new ArrayList<>();
        for (BalanceGameHistory balanceGameHistoryEntity : balanceGameHistoryEntities) {
            balanceGameHistories.add(balanceGameHistoryEntity.convertToDto());
        }

        return balanceGameHistories;
    }


    @Override
    public void selectBalanceGame(Long balanceGameIdx, Long memberIdx, byte selectAnswer) {

        BalanceGame balanceGame = balanceGameRepository.findBalanceGameByIdx(balanceGameIdx)
            .orElseThrow(() -> new NoSuchElementException());

        Member member = memberRepository.findMemberByUuid()

        BalanceGameHistory  balanceGameHistory = BalanceGameHistory.builder()
                .balanceGame()
                .memberIdx()
    }
}
