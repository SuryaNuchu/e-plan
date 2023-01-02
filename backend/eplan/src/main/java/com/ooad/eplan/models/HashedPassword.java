package com.ooad.eplan.models;

import com.ooad.eplan.services.ILoggerService;
import com.ooad.eplan.services.serviceImpl.LoggerService;

public class HashedPassword implements PasswordSecurity{

    ILoggerService loggerService=new LoggerService();

    private PasswordSecurity passwordSecurity;

    public HashedPassword(PasswordSecurity passwordSecurity) {
        this.passwordSecurity = passwordSecurity;
    }

    @Override
    public String secured(String password) {
        var result = securedUsingHashing(password);
        return passwordSecurity.secured(result);
    }
    public String securedUsingHashing(String password){
        loggerService.info("password has been secured using hashing algorithm");
        return password+"_h";
    }
}