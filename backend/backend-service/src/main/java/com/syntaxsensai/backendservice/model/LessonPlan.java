package com.syntaxsensai.backendservice.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Table(name = "lesson_plan")
@Entity
@Getter
@Setter
public class LessonPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, name = "lesson_plan_id")
    private UUID lessonPlanId;
    
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    /**
     * A short summary for the lesson plan that describes what the essay is about
     */
    @Column(nullable = false, name = "summary")
    private String summary;
    
    @Column(nullable = false, name = "essay_content")
    private String essayContent;
}
