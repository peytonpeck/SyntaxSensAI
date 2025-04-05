package com.syntaxsensai.backendservice.mapper;

import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserDTO toDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        BeanUtils.copyProperties(user, dto);
        return dto;
    }
    
    public User toEntity(UserDTO dto) {
        if (dto == null) return null;
        User user = new User();
        BeanUtils.copyProperties(dto, user);
        return user;
    }
}
