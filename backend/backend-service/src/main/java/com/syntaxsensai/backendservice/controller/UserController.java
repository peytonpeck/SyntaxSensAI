package com.syntaxsensai.backendservice.controller;

import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class UserController {
    private final UserService userService;
    
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<UserDTO> authenticatedUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }
}
