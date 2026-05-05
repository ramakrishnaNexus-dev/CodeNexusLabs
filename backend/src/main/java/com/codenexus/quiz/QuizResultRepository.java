package com.codenexus.quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserEmail(String email);
    List<QuizResult> findByQuizId(Long quizId);
    long countByUserId(Long userId);
}