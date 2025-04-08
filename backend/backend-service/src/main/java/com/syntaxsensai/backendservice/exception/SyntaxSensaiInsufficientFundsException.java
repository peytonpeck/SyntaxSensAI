package com.syntaxsensai.backendservice.exception;

public class SyntaxSensaiInsufficientFundsException extends RuntimeException {
    public SyntaxSensaiInsufficientFundsException() {
        super("You do not have enough credits for this.");
    }
}
