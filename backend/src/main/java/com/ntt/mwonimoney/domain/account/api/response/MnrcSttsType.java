package com.ntt.mwonimoney.domain.account.api.response;

public enum MnrcSttsType {
    TYPE_NORMAL("1"),
    TYPE_PROCESSING("0"),
    TYPE_ERROR("9");

    private final String value;

    MnrcSttsType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

