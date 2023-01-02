package com.ooad.eplan.models.auth;

public class AuthenticationResponse {
    private String name;
    private String role;
    private String email;
    private String orgId;
    private String id;
    public AuthenticationResponse(){}

    public AuthenticationResponse(String name, String email, String role, String orgId, String id) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.email = email;
        this.orgId = orgId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}