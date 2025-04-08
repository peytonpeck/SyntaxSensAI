package com.syntaxsensai.backendservice.service;

import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.mapper.UserMapper;
import com.syntaxsensai.backendservice.repository.UserRepository;
import com.syntaxsensai.backendservice.util.Utils;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    
    public UserDTO getCurrentUser() {
        return Utils.getContextUser();
    }
    
    public void changeUserWordCredit(UUID userId, Integer amount) {
        userRepository.addWordCredit(userId, amount);
    }
}
