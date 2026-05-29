package com.codenexus.course;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "topics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 5000)
    private String content;
    
    private String type;
    
    @Column(name = "order_index")
    private int orderIndex;
    
    private String section;

    @Column(name = "course_id")
    private Long courseId;  // Simple Long, not @ManyToOne
}