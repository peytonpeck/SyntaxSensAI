package com.syntaxsensai.backendservice.exception;

import org.springframework.security.authentication.BadCredentialsException;

public class SyntaxSensaiInvalidCredentialsException extends BadCredentialsException {
    public SyntaxSensaiInvalidCredentialsException(String msg) {
        super(msg);
    }
    
    public SyntaxSensaiInvalidCredentialsException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
