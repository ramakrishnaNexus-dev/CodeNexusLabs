package com.codenexus.course;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "topic_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long courseId;
    private Long topicId;
    private String userEmail;
    private boolean completed;
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        if (completed && completedAt == null) {
            completedAt = LocalDateTime.now();
        }
    }
}