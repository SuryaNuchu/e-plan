package com.ooad.eplan.enums;

public enum Entitlements {
    AcessToAll("AcessToAll"),
    AccessToUpdate("AccessToUpdate"),
    AccessToDelete("AccessToDelete"),
    AccessToView("AccessToView");

    public final String access;

    Entitlements(String access) {
        this.access = access;
    }
}
