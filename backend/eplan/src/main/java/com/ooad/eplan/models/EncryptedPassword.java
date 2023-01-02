package com.ooad.eplan.models;

import com.ooad.eplan.services.ILoggerService;
import com.ooad.eplan.services.serviceImpl.LoggerService;

public class EncryptedPassword implements PasswordSecurity{
    public EncryptedPassword(PasswordSecurity passwordSecurity) {
        this.passwordSecurity = passwordSecurity;
    }

    private PasswordSecurity passwordSecurity;


    ILoggerService loggerService=new LoggerService();
    @Override
    public String secured(String password) {
        var result = securedUsingEncryption(password);
        return passwordSecurity.secured(result);
    }
    private String securedUsingEncryption(String password){
        loggerService.info("password has been secured using encryption algorithm");
        return password+"_e";
    }
}