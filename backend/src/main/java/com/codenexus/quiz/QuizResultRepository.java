package com.codenexus.quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    
    long count();
    
    List<QuizResult> findByUserId(Long userId);
    
    List<QuizResult> findByQuizId(Long quizId);
    
    List<QuizResult> findByUserEmail(String email);
    
    // Count quiz results for a course (using quizId field)
    @Query("SELECT COUNT(qr) FROM QuizResult qr WHERE qr.quizId IN (SELECT q.id FROM Quiz q WHERE q.courseId = :courseId)")
    long countByCourseId(@Param("courseId") Long courseId);
    
    // Find quiz results for a user in a course
    @Query("SELECT qr FROM QuizResult qr WHERE qr.userId = :userId AND qr.quizId IN (SELECT q.id FROM Quiz q WHERE q.courseId = :courseId)")
    List<QuizResult> findByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);
}