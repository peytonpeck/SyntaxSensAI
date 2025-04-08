package com.syntaxsensai.backendservice.controller;

import com.syntaxsensai.backendservice.dto.CreateLessonPlanDTO;
import com.syntaxsensai.backendservice.dto.LessonPlanDTO;
import com.syntaxsensai.backendservice.service.LessonPlanService;
import com.syntaxsensai.backendservice.util.Utils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/lesson-plan")
@RestController
public class LessonPlanController {
    private final LessonPlanService lessonPlanService;
    
    public LessonPlanController(LessonPlanService lessonPlanService) {
        this.lessonPlanService = lessonPlanService;
    }
    
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<LessonPlanDTO>> getLessonPlans(@RequestParam(required = false) UUID lessonPlanId) {
        return ResponseEntity.ok(lessonPlanService.getLessonPlans(lessonPlanId, Utils.getContextUser().getUserId()));
    }
    
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<LessonPlanDTO> authenticatedUser(@RequestBody @Valid CreateLessonPlanDTO lessonPlanDTO) {
        return ResponseEntity.ok(lessonPlanService.createLessonPlan(lessonPlanDTO, Utils.getContextUser()));
    }
}
