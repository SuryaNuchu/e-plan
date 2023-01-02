package com.ooad.eplan.enums;

public enum Role {
    CEO("CEO"),
    ADMIN("ADMIN"),
    STAFF("STAFF");

    public final String role;

    Role(String role) {
        this.role = role;
    }
}
