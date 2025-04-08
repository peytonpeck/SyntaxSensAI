package com.syntaxsensai.backendservice.service;

import com.syntaxsensai.backendservice.dto.CreateLessonPlanDTO;
import com.syntaxsensai.backendservice.dto.LessonPlanDTO;
import com.syntaxsensai.backendservice.dto.UserDTO;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiDataNotFoundException;
import com.syntaxsensai.backendservice.exception.SyntaxSensaiInsufficientFundsException;
import com.syntaxsensai.backendservice.mapper.LessonPlanMapper;
import com.syntaxsensai.backendservice.model.LessonPlan;
import com.syntaxsensai.backendservice.model.User;
import com.syntaxsensai.backendservice.repository.LessonPlanRepository;
import com.syntaxsensai.backendservice.repository.UserRepository;
import jakarta.annotation.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LessonPlanService {
    private final LessonPlanRepository lessonPlanRepository;
    private final UserRepository userRepository;
    private final LessonPlanMapper lessonPlanMapper;
    private final UserService userService;
    
    public LessonPlanService(LessonPlanRepository lessonPlanRepository, UserRepository userRepository, LessonPlanMapper lessonPlanMapper, UserService userService) {
        this.lessonPlanRepository = lessonPlanRepository;
        this.userRepository = userRepository;
        this.lessonPlanMapper = lessonPlanMapper;
        this.userService = userService;
    }
    
    public List<LessonPlanDTO> getLessonPlans(@Nullable UUID lessonPlanId, UUID userId) {
        if (lessonPlanId == null) {
            return lessonPlanRepository.findByUserUserId(userId).stream().map(lessonPlanMapper::toDTO).collect(Collectors.toList());
        }
        
        LessonPlan single = lessonPlanRepository.findByLessonPlanIdAndUserUserId(lessonPlanId, userId)
                .orElseThrow(() -> new SyntaxSensaiDataNotFoundException("No lesson plan exists by id: " + lessonPlanId));
        
        return List.of(lessonPlanMapper.toDTO(single));
    }
    
    public LessonPlanDTO createLessonPlan(CreateLessonPlanDTO createLessonPlanDTO, UserDTO user) {
        // Ensure the user has sufficient funds
        int requiredCredits = createLessonPlanDTO.getEssayContent().length();
        if (user.getCharacterCredits() < requiredCredits) {
            throw new SyntaxSensaiInsufficientFundsException();
        }
        
        // Withdraw the correct amount of funds from the user
        userService.changeUserWordCredit(user.getUserId(), -1 * requiredCredits);
        
        // TODO: Call model service
        LessonPlanDTO lessonPlanDTO = new LessonPlanDTO();
        lessonPlanDTO.setEssayContent(createLessonPlanDTO.getEssayContent());
        lessonPlanDTO.setSummary("Summary of Lesson Plan");
        
        LessonPlan entity = lessonPlanMapper.toEntity(lessonPlanDTO);
        User dbUser = userRepository.getReferenceById(user.getUserId());
        entity.setUser(dbUser);
        
        LessonPlan result = lessonPlanRepository.save(entity);
        
        result.setUser(dbUser);
        
        return lessonPlanMapper.toDTO(result);
    }
}
