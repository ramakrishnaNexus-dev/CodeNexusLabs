package com.codenexus.interview;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    
    @Column(length = 1000)
    private String question;
    
    @Column(length = 2000)
    private String answer;
    
    private String difficulty;
}