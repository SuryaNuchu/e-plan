package com.ooad.eplan.controllers;

import com.ooad.eplan.services.ILoggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;

public class BaseController {

    @Autowired
    ILoggerService loggerService;

    @ExceptionHandler(NoResultException.class)
    public ResponseEntity<?> handleNoResultException(
            NoResultException noResultException, HttpServletRequest request) {

        loggerService.info("< handleNoResultException");
        return new ResponseEntity<Object>(HttpStatus.OK);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(
            Exception exception, HttpServletRequest request) {

        loggerService.info("> handleException");
        loggerService.info("- Exception: "+ exception);

        loggerService.info("< handleException");
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
}
