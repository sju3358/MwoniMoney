package com.ntt.mwonimoney.domain.account.api.response;

public enum CcynType {
    TYPE_NORMAL("0"),
    TYPE_CANCEL("1");

    private final String value;

    CcynType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
