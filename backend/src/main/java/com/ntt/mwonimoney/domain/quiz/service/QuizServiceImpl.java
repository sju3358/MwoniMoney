package com.ntt.mwonimoney.domain.quiz.service;

import java.util.ArrayList;
import java.util.List;

import com.ntt.mwonimoney.domain.account.service.v2.FinAccountTransactionServiceImplV2;
import com.ntt.mwonimoney.domain.member.entity.Parent;
import com.ntt.mwonimoney.domain.member.repository.ChildrenRepository;
import com.ntt.mwonimoney.domain.member.service.ChildService;
import com.ntt.mwonimoney.domain.member.service.ChildrenService;
import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.domain.quiz.entity.QuizHistory;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerRequestDto;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerResponseDto;
import com.ntt.mwonimoney.domain.quiz.repository.QuizHistoryRepository;
import org.springframework.stereotype.Service;

import com.ntt.mwonimoney.domain.quiz.entity.Quiz;
import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;
import com.ntt.mwonimoney.domain.quiz.repository.QuizRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

	private final QuizRepository quizRepository;
	private final QuizHistoryRepository quizHistoryRepository;
	private final FinAccountTransactionServiceImplV2 finAccountTransactionServiceImplV2;
	private final MemberService memberService;
	private final ChildrenRepository childrenRepository;
	public List<QuizDto> getRandom5QuizSet() {

		List<Quiz> quizListEntity = quizRepository.findRandom5Quiz();

		List<QuizDto> quizDtoList = new ArrayList<>();
		for (Quiz quizEntity : quizListEntity) {
			quizDtoList.add(quizEntity.convertToDto());
		}

		return quizDtoList;
	}

	@Override
	public PostAnswerResponseDto postAnswer(String memberUUID, PostAnswerRequestDto postAnswerRequestDto) {

		Long memberIdx = memberService.getMemberIdx(memberUUID);

		QuizHistory quizHistory = quizHistoryRepository.postAnswer(memberIdx, postAnswerRequestDto);

		quizHistoryRepository.save(quizHistory);

		List<Parent> parents = childrenRepository.findParents(memberUUID);

		// 부모 UUID
		String parentsUUID = parents.get(0).getUuid();

//		finAccountTransactionServiceImplV2.makeTransaction(memberUUID, toUUID, amount, memo);
		if(quizHistory.getIsAnswer().equals("Y")) {
			finAccountTransactionServiceImplV2.makeQuizTransaction(parentsUUID, memberUUID, "퀴즈 리워드");
		}

		PostAnswerResponseDto result = PostAnswerResponseDto.builder()
				.isAnswer(quizHistory.getIsAnswer())
				.quizIdx(quizHistory.getQuizIdx())
				.memberIdx(quizHistory.getMemberIdx())
				.build();

		return result;
	}


}
