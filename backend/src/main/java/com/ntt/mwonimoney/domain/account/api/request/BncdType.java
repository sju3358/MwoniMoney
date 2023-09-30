package com.ntt.mwonimoney.domain.account.api.request;

public enum BncdType {
    TYPE_011("011"),
    TYPE_012("012");

    private final String value;

    BncdType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
