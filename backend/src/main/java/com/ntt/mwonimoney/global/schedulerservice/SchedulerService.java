package com.ntt.mwonimoney.global.schedulerservice;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ntt.mwonimoney.domain.account.entity.FinAccount;
import com.ntt.mwonimoney.domain.account.entity.FinAccountType;
import com.ntt.mwonimoney.domain.account.repository.FinAccountRepository;
import com.ntt.mwonimoney.domain.challenge.entity.MemberChallenge;
import com.ntt.mwonimoney.domain.challenge.repository.MemberChallengeRepository;
import com.ntt.mwonimoney.domain.member.entity.Child;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.model.vo.MemberRole;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SchedulerService {
	private final MemberChallengeRepository memberChallengeRepository;
	private final MemberRepository memberRepository;
	private final FinAccountRepository finAccountRepository;

	// 매일 오전 0시 0분마다 실행
	@Scheduled(cron = "0 0 0 * * *")
	public void run() {
		LocalDate now = LocalDate.now();
		log.info("현재 시간 : {}", now);

		// 챌린지의 status값이 3인 것을 모두 찾고
		// 그 챌린지에 대해 endDate + 1이 now()와 같을 때,
		// update를 한다.
		List<MemberChallenge>
			expirationChallengeList = memberChallengeRepository.findByEndTimeBeforeAndStatus(
			now.atStartOfDay(), Arrays.asList(0, 1, 2));
		log.info("시간 : {}", now.atStartOfDay());
		log.info("리스트 : {}", expirationChallengeList);

		for (MemberChallenge memberChallenge :
			expirationChallengeList) {
			memberChallenge.update(5);
		}
	}

	@Transactional
	@Scheduled(cron = "0 0 6 * * *")
	public void addAllowance() {
		List<Member> childList = memberRepository.findAllByMemberRole(MemberRole.CHILD);

		for (Member child : childList) {
			int reqularAllowance = ((Child)child).getRegularAllowance();
			Optional<FinAccount> finAccount = finAccountRepository.findFinAccountByMemberIdxAndType(child.getIdx(),
				FinAccountType.GENERAL);

			if (finAccount.isPresent()) {
				finAccount.get().changeRemain(finAccount.get().getRemain() + reqularAllowance);
			}
		}
	}
}
