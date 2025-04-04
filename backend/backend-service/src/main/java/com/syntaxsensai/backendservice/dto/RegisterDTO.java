package com.syntaxsensai.backendservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class RegisterDTO {
    @NotEmpty
    @Email
    private String email;
    
    @NotEmpty
    @Size(min = 8)
    private String password;
    
    @NotEmpty
    private String firstName;
    
    @NotEmpty
    private String lastName;
}
