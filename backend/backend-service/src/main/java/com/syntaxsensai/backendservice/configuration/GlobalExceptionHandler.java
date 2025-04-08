package com.syntaxsensai.backendservice.configuration;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.syntaxsensai.backendservice.dto.ErrorDTO;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiEmailAlreadyUsedException;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiInsufficientFundsException;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiInvalidCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    private ObjectMapper objectMapper = new ObjectMapper();
    
    @ExceptionHandler({SyntaxSensaiInvalidCredentialsException.class, SyntaxSensaiEmailAlreadyUsedException.class,
            SyntaxSensaiInsufficientFundsException.class, SyntaxSensaiDataNotFoundException.class})
    public ResponseEntity<String> handleBadCredentials(Exception ex) {
        ErrorDTO dto = new ErrorDTO("Bad Request", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorToString(dto));
    }
    
    // Handle generic validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException ex) {
        ErrorDTO dto = new ErrorDTO("Validation Error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorToString(dto));
    }
    
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        ErrorDTO dto = new ErrorDTO("Not Found", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorToString(dto));
    }
    
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<Object> handleAuthorizationDeniedException(AuthorizationDeniedException ex) {
        ErrorDTO dto = new ErrorDTO("Access Denied", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorToString(dto));
    }
    
    // Fallback for all other exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleOtherExceptions(Exception ex) {
        ex.printStackTrace();
        ErrorDTO dto = new ErrorDTO("Internal Server Error", "Something went wrong in the server.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorToString(dto));
    }
    
    private String errorToString(ErrorDTO dto) {
        try {
            return objectMapper.writeValueAsString(dto);
        } catch (JsonProcessingException e) {
            return "{\"message\":\"Something went wrong when parsing exception\",\"details\":\"Unknown error occurred when parsing exception.\"}";
        }
    }
}
