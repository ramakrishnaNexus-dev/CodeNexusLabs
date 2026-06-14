package com.codenexus.interview;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewCourseRepository extends JpaRepository<InterviewCourse, Long> {
    List<InterviewCourse> findByCategory(String category);
    List<InterviewCourse> findByActiveTrue();
}