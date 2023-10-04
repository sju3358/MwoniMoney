package com.ntt.mwonimoney.domain.account.service.v2;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountTransaction;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.model.dto.GetTransactionResponseDto;
import com.ntt.mwonimoney.domain.account.model.dtoV2.GetTransactionRequestDto;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.account.repository.FinAccountTransactionRepository;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service(value = "FinAccountTransactionServiceV2")
@RequiredArgsConstructor
public class FinAccountTransactionServiceImplV2 {

	private final FinAccountTransactionRepository finAccountTransactionRepository;
	private final FinAccountRepository finAccountRepository;
	private final MemberRepository memberRepository;

	public List<GetTransactionResponseDto> getTransaction(Long memberIdx,
		GetTransactionRequestDto getTransactionRequestDto) {

		List<FinAccountTransaction> result = finAccountTransactionRepository.getTransaction(memberIdx,
			getTransactionRequestDto);

		return result.stream().map(transaction -> GetTransactionResponseDto.builder()
			.time(transaction.getTime())
			.money(transaction.getMoney())
			.balance(transaction.getBalance())
			.memo(transaction.getMemo()).build()
		).collect(Collectors.toList());
	}

	public void makeTransaction(String fromUUID, String toUUID, int amount, String memo) {
		makeTransaction(fromUUID, toUUID, amount, memo, FinAccountType.GENERAL, FinAccountType.GENERAL);
	}

	public void makeTransaction(String fromUUID, String toUUID, int amount, String memo, FinAccountType fromType,
		FinAccountType toType) {

		Member fromMember = memberRepository.findMemberByUuid(fromUUID)
			.orElseThrow(() -> new NoSuchElementException("송금자 멤버정보가 없습니다."));
		Member toMember = memberRepository.findMemberByUuid(toUUID)
			.orElseThrow(() -> new NoSuchElementException("수신자 멤버정보가 없습니다."));

		FinAccount fromFinAccount = finAccountRepository
			.findFinAccountByMemberIdxAndType(fromMember.getIdx(), fromType)
			.orElseThrow(() -> new NoSuchElementException("송금자 멤버정보가 없습니다."));
		FinAccount toFinAccount = finAccountRepository
			.findFinAccountByMemberIdxAndType(toMember.getIdx(), toType)
			.orElseThrow(() -> new NoSuchElementException("수신자 멤버정보가 없습니다."));

		if (fromFinAccount.getRemain() - amount < 0)
			throw new IllegalArgumentException("잔액이 부족합니다");

		FinAccountTransaction fromTransaction = FinAccountTransaction.builder()
			.money((-1) * amount)
			.balance(fromFinAccount.getRemain() - amount)
			.memo(memo)
			.time(LocalDateTime.now())
			.build();
		fromTransaction.addFinAccount(fromFinAccount);
		fromFinAccount.changeRemain(fromFinAccount.getRemain() - amount);

		FinAccountTransaction toTransaction = FinAccountTransaction.builder()
			.money(amount)
			.balance(fromFinAccount.getRemain() + amount)
			.memo(memo)
			.time(LocalDateTime.now())
			.build();
		toTransaction.addFinAccount(toFinAccount);
		toTransaction.changeMemo(toFinAccount.getFinAcno() + amount);

		finAccountTransactionRepository.save(fromTransaction);
		finAccountTransactionRepository.save(toTransaction);

	}

}
