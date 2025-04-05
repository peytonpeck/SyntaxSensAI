package com.syntaxsensai.backendservice.service;

import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.mapper.UserMapper;
import com.syntaxsensai.backendservice.model.User;
import com.syntaxsensai.backendservice.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    
    public UserDTO getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        User currentUser = (User) authentication.getPrincipal();
        
        return this.userMapper.toDTO(currentUser);
    }
}
