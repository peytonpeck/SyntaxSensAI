package com.syntaxsensai.backendservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDTO {
    private String email;
    private String password;
}
