package com.syntaxsensai.backendservice.mapper;

import com.syntaxsensai.backendservice.dto.LessonPlanDTO;
import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.model.LessonPlan;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class LessonPlanMapper {
    
    private final PersistenceUtil persistenceUtil = Persistence.getPersistenceUtil();
    
    public LessonPlanDTO toDTO(LessonPlan lessonPlan) {
        if (lessonPlan == null) return null;
        LessonPlanDTO dto = new LessonPlanDTO();
        BeanUtils.copyProperties(lessonPlan, dto);
        
        // Only copy over the user if it is loaded
        if (persistenceUtil.isLoaded(lessonPlan, "user")) {
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(lessonPlan.getUser(), userDTO);
            dto.setUser(userDTO);
        }
        
        return dto;
    }
    
    public LessonPlan toEntity(LessonPlanDTO dto) {
        if (dto == null) return null;
        LessonPlan lessonPlan = new LessonPlan();
        BeanUtils.copyProperties(dto, lessonPlan);
        return lessonPlan;
    }
}
