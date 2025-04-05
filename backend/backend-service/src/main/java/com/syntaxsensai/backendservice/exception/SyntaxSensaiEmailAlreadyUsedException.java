package com.syntaxsensai.backendservice.exception;

public class SyntaxSensaiEmailAlreadyUsedException extends RuntimeException {
    public SyntaxSensaiEmailAlreadyUsedException() {
        super("This email is already in use.");
    }
}
