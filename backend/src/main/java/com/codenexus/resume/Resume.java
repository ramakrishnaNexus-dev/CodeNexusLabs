package com.codenexus.resume;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String userEmail;
    private String templateId;
    
    @Column(length = 5000)
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String title;
    
    @Column(length = 2000)
    private String summary;
    
    @Column(length = 1000)
    private String skills;
    
    @Column(length = 2000)
    private String experience;
    
    @Column(length = 1000)
    private String education;
    
    @Column(length = 2000)
    private String projects;
    
    @Column(length = 500)
    private String languages;
    
    @Column(length = 500)
    private String certifications;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}