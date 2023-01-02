package com.ooad.eplan.util;

import com.ooad.eplan.models.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class Utils {

    public String getUUID() {
        return UUID.randomUUID().toString();
    }

    private PasswordSecurity passwordSecurity;

    public String processPasswordSecuring(String password,PasswordSecurity passwordSecurity) {
        return passwordSecurity.secured(password);
    }

    public String getProtectedPassword(String password, String password_security_chain) {
        //String password_security_chain="encryption,hashing";
        switch (password_security_chain) {
            case "encryption,hashing":
                return processPasswordSecuring(password, new EncryptedPassword(new HashedPassword(new OriginalPassword())));
            case "hashing,encryption":
                return processPasswordSecuring(password, new HashedPassword(new EncryptedPassword(new OriginalPassword())));
            case "hashing":
                return processPasswordSecuring(password, new HashedPassword(new OriginalPassword()));
            case "encryption":
                return processPasswordSecuring(password, new EncryptedPassword(new OriginalPassword()));
            default:
                return processPasswordSecuring(password, new OriginalPassword());

        }


    }
}
