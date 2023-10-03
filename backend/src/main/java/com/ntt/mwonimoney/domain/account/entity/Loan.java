package com.ntt.mwonimoney.domain.account.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.C;

import java.time.LocalDateTime;

@Entity
@Table(name = "loan")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_idx")
    private Long idx;

    @Column(name="loan_lender")
    private Long lender;

    @Column(name = "loan_borrower")
    private Long borrower;

    @Column(name = "loan_status")
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    @Column(name = "loan_name")
    private String name;

    @Column(name = "loan_content")
    private String content;

    @Column(name = "loan_amount")
    private int amount;

    @Column(name = "loan_deadline")
    private LocalDateTime deadline;

    @Column(name = "loan_rate")
    private Double rate;

    @Builder
    public Loan(Long lender, Long borrower, LoanStatus status, String name, String content, int amount, LocalDateTime deadline, Double rate){
        this.lender = lender;
        this.borrower = borrower;
        this.status = status;
        this.name = name;
        this.content = content;
        this.amount = amount;
        this.deadline = deadline;
        this.rate = rate;
    }

    public void changeStatus(LoanStatus status){
        this.status = status;
    }

    public void changeAmount(int amount){
        this.amount = amount;
    }

}
