package com.codenexus.quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    
    long count();
    
    List<QuizResult> findByUserId(Long userId);
    
    List<QuizResult> findByQuizId(Long quizId);
    
    // ===== EXISTING METHODS — DO NOT REMOVE =====
    List<QuizResult> findByUserEmail(String email);
    
    // ===== NEW METHODS FOR DASHBOARD =====
    @Query("SELECT COUNT(qr) FROM QuizResult qr JOIN qr.quiz q WHERE q.course.id = :courseId")
    long countByCourseId(@Param("courseId") Long courseId);
    
    @Query("SELECT qr FROM QuizResult qr JOIN qr.quiz q WHERE qr.user.id = :userId AND q.course.id = :courseId")
    List<QuizResult> findByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);
}