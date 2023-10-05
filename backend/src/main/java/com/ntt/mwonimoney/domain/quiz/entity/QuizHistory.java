package com.ntt.mwonimoney.domain.quiz.entity;

import com.ntt.mwonimoney.global.common.entity.CommonEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "quiz_history")
public class QuizHistory extends CommonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_history_idx")
    private Long id;

    @Column(name = "is_answer")
    private String isAnswer;

    @Column(name = "member_idx")
    private Long memberIdx;

    @Column(name = "quiz_idx")
    private Long quizIdx;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "quiz_idx")
//    private Quiz quiz;

    @Builder
    public QuizHistory(String isAnswer, Long memberIdx, Long quizIdx) {
        this.isAnswer = isAnswer;
        this.memberIdx = memberIdx;
        this.quizIdx = quizIdx;
    }
}
