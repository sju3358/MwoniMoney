package com.ntt.mwonimoney.domain.account.entity;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public enum LoanStatus {
    APPROVAL, REJECTION, WATING, PAID;
}
