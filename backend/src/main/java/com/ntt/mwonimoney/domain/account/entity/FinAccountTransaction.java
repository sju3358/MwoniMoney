package com.ntt.mwonimoney.domain.account.entity;

import com.ntt.mwonimoney.global.common.entity.CommonEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "fin_account_transaction")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinAccountTransaction extends CommonEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_idx")
    private Long id;

    @Column(name = "transaction_money")
    private int money;

    @Column(name = "transaction_balance")
    private int balance;

    @Column(name = "transaction_memo")
    private String memo;

    @Column(name = "transaction_time")
    private LocalDateTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fin_account_idx")
    private FinAccount finAccount;

    @Builder
    public FinAccountTransaction(Long id, int money, int balance, String memo, LocalDateTime time){
        this.id = id;
        this.money = money;
        this.balance = balance;
        this.memo = memo;
        this.time = time;
    }

    public void addFinAccount(FinAccount finAccount){
        this.finAccount = finAccount;
//        finAccount.addFinAccountTransaction(this);
    }
}
