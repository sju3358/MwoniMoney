package com.ntt.mwonimoney.domain.account.api.response;

public enum MnrcDrotDsncType {
    TYPE_NEW("1"),
    TYPE_DEPOSIT("2"),
    TYPE_WITHDRAW("3"),
    TYPE_CANCELLATION("4");

    private final String value;

    MnrcDrotDsncType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
