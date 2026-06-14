package com.codenexus.interview;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_topics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "content", columnDefinition = "TEXT")  // Changed from length = 5000
    private String content;

    private String type;

    @Column(name = "order_index")
    private int orderIndex;

    private String section;

    @Column(name = "interview_course_id")
    private Long interviewCourseId;
}