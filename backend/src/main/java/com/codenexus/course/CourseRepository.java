package com.codenexus.course;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCategory(String category);
    List<Course> findByDifficulty(String difficulty);
    List<Course> findByTitleContainingIgnoreCase(String title);
    List<Course> findByActiveTrue();
    long countByActiveTrue();
}