package com.ooad.eplan.models;

import com.ooad.eplan.services.ILoggerService;
import com.ooad.eplan.services.serviceImpl.LoggerService;

public class OriginalPassword implements PasswordSecurity{

    ILoggerService loggerService=new LoggerService();
    @Override
    public String secured(String password) {
        loggerService.info("password securing processing is complete");
        return password;
    }
}
