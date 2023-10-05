package com.ntt.mwonimoney.domain.quiz.repository;

import com.ntt.mwonimoney.domain.game.entity.BalanceGame;
import com.ntt.mwonimoney.domain.game.entity.QBalanceGame;
import com.ntt.mwonimoney.domain.quiz.entity.QQuiz;
import com.ntt.mwonimoney.domain.quiz.entity.Quiz;
import com.ntt.mwonimoney.domain.quiz.entity.QuizHistory;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerRequestDto;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomQuizHistoryRepositoryImpl implements CustomQuizHistoryRepository{

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public QuizHistory postAnswer(Long memberIdx, PostAnswerRequestDto postAnswerRequestDto) {
        int memberAnswer = postAnswerRequestDto.getAnswer();
        Long quizIdx = postAnswerRequestDto.getQuizIdx();

        Quiz quiz = jpaQueryFactory.selectFrom(QQuiz.quiz)
                .where(QQuiz.quiz.id.eq(quizIdx))
                .fetchOne();

        String isAnswerCorrect = (quiz != null && quiz.getAnswer() == memberAnswer) ? "Y" : "N";

        QuizHistory result = QuizHistory.builder()
                .quizIdx(quizIdx)
                .isAnswer(isAnswerCorrect)
                .memberIdx(memberIdx)
                .build();

        return result;
    }


}
