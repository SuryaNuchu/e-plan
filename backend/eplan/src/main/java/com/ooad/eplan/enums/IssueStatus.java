package com.ooad.eplan.enums;

public enum IssueStatus {

    BACKLOG("BACKLOG"),
    TODO("TODO"),
    PENDING("PENDING"),
    DONE("DONE"),
    RUN("RUN");

    public final String action;

    IssueStatus(String action) {
        this.action = action;
    }
}
