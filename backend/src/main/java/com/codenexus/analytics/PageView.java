package com.codenexus.analytics;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "page_views")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PageView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pageUrl;
    private String sessionId;
    private String userEmail;
    
    // NEW: Location tracking fields
    private String ipAddress;
    private String country;
    private String city;
    private String region;
    private String userAgent;
    
    private LocalDateTime viewedAt;

    @PrePersist
    protected void onCreate() {
        viewedAt = LocalDateTime.now();
    }
}