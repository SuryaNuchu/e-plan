package com.ooad.eplan.services.serviceImpl;

import com.ooad.eplan.services.ILoggerService;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class LoggerService implements ILoggerService {
    @Override
    public void info(String content) {
        System.out.println(content);
    }
}
