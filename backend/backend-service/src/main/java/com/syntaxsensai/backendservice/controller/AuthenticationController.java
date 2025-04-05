package com.syntaxsensai.backendservice.controller;

import com.syntaxsensai.backendservice.dto.LoginDTO;
import com.syntaxsensai.backendservice.dto.RegisterDTO;
import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.model.User;
import com.syntaxsensai.backendservice.service.AuthenticationService;
import com.syntaxsensai.backendservice.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid RegisterDTO registerDTO) {
        return ResponseEntity.ok(authenticationService.signup(registerDTO));
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserDTO> authenticate(@RequestBody @Valid LoginDTO loginDTO) {
        return ResponseEntity.ok(authenticationService.authenticate(loginDTO));
    }
}
