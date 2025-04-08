package com.syntaxsensai.backendservice.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class LessonPlanDTO {
    private UUID lessonPlanId;
    private UserDTO user;
    private String essayContent;
    private String summary;
}
