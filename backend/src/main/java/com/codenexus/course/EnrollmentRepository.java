package com.codenexus.course;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserEmail(String email);
    List<Enrollment> findByCourseId(Long courseId);
    Optional<Enrollment> findByUserEmailAndCourseId(String email, Long courseId);
  //  long countByCourseId(Long courseId);
    long countByCourseId(Long courseId);
    boolean existsByUserEmailAndCourseId(String email, Long courseId);
}