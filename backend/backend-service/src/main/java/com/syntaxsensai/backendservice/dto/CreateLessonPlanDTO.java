package com.syntaxsensai.backendservice.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateLessonPlanDTO {
    @NotEmpty
    @Size(max = 100000)
    private String essayContent;
}
