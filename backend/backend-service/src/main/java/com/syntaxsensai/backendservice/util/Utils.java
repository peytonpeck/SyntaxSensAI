package com.syntaxsensai.backendservice.util;

import com.syntaxsensai.backendservice.dto.UserDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class Utils {
    public static UserDTO getContextUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        return (UserDTO) authentication.getPrincipal();
    }
}
