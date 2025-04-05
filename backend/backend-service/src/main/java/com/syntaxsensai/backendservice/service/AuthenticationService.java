package com.syntaxsensai.backendservice.service;

import com.syntaxsensai.backendservice.dto.LoginDTO;
import com.syntaxsensai.backendservice.dto.RegisterDTO;
import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiEmailAlreadyUsedException;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiInvalidCredentialsException;
import com.syntaxsensai.backendservice.mapper.UserMapper;
import com.syntaxsensai.backendservice.model.User;
import com.syntaxsensai.backendservice.repository.UserRepository;
import jakarta.annotation.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    
    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            UserMapper userMapper,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
    }
    
    public UserDTO signup(RegisterDTO input) {
        if (userRepository.existsByEmail(input.getEmail())) {
            throw new SyntaxSensaiEmailAlreadyUsedException();
        }
        
        User user = new User(input.getFirstName(), input.getLastName(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
        
        userRepository.save(user);
        
        return userMapper.toDTO(user);
    }
    
    public UserDTO authenticate(LoginDTO input) throws SyntaxSensaiInvalidCredentialsException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new SyntaxSensaiInvalidCredentialsException("Invalid email or password.");
        };
        
        User authenticatedUser = userRepository.findByEmail(input.getEmail()).orElse(null);
        
        if (authenticatedUser == null) {
            throw new SyntaxSensaiInvalidCredentialsException("Invalid email or password.");
        }
        
        String jwtToken = jwtService.generateToken(authenticatedUser);
        
        UserDTO dto = userMapper.toDTO(authenticatedUser);
        
        dto.setToken(jwtToken);
        
        return dto;
    }
}
