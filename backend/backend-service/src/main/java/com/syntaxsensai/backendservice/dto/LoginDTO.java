package com.syntaxsensai.backendservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDTO {
    @NotEmpty
    @Email
    private String email;
    
    @NotEmpty
    @Size(min = 8)
    private String password;
}
