package com.syntaxsensai.backendservice.repository;

import com.syntaxsensai.backendservice.model.LessonPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LessonPlanRepository extends JpaRepository<LessonPlan, UUID> {
    List<LessonPlan> findByUserUserId(UUID userId);
    
    Optional<LessonPlan> findByLessonPlanIdAndUserUserId(UUID lessonPlanId, UUID userId);
}
