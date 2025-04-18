package com.syntaxsensai.backendservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private UUID userId;
    private String email;
    private String firstName;
    private String lastName;
    private String token;
    private Integer characterCredits;
}
