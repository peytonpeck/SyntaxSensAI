package com.syntaxsensai.backendservice.dto;

import lombok.Getter;

@Getter
public class RegisterDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
