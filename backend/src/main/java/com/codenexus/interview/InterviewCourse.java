package com.codenexus.interview;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "interview_courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String category;
    private String difficulty;
    private String duration;
    private String instructor;

    @Column(name = "logo_url")
    private String logoUrl;

    private int studentsCount;
    private double rating;
    private boolean active;
    private LocalDateTime createdAt;

    @OneToMany
    @JoinColumn(name = "interview_course_id")
    @OrderBy("orderIndex ASC")
    private List<InterviewTopic> topics = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (difficulty == null) difficulty = "Beginner";
        if (rating == 0) rating = 4.5;
    }
}