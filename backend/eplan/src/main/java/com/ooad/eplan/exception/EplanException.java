package com.ooad.eplan.exception;

import org.springframework.http.HttpStatus;

public class EplanException extends RuntimeException{
    private String error;

    public EplanException(String error){
        super(error);
    }

}
