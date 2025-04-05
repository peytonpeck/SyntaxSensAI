package com.syntaxsensai.backendservice.configuration;

import com.syntaxsensai.backendservice.exception.SyntaxSensaiEmailAlreadyUsedException;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiInvalidCredentialsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler({SyntaxSensaiInvalidCredentialsException.class, SyntaxSensaiEmailAlreadyUsedException.class})
    public ResponseEntity<String> handleBadCredentials(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
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
