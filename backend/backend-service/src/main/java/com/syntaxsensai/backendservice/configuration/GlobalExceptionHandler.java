package com.syntaxsensai.backendservice.configuration;

import com.syntaxsensai.backendservice.exception.SyntaxSensaiInvalidCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(SyntaxSensaiInvalidCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials(SyntaxSensaiInvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email or password");
    }
    
    // Handle generic validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation error: " + ex.getMessage());
    }
    
    // Fallback for all other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleOtherExceptions(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong in the server.");
    }
}
