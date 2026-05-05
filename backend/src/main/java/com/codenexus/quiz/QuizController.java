package com.codenexus.quiz;

import com.codenexus.common.ApiResponse;
import com.codenexus.security.JwtUtils;
import com.codenexus.auth.UserRepository;
import com.codenexus.auth.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuizResultRepository quizResultRepository;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    @GetMapping("/course/{courseId}")
    public ApiResponse<Map<String, Object>> getQuizByCourse(@PathVariable Long courseId) {
        Optional<Quiz> quizOpt = quizRepository.findByCourseIdAndActiveTrue(courseId);
        if (quizOpt.isEmpty()) return ApiResponse.error("No quiz found");

        Quiz quiz = quizOpt.get();
        List<Map<String, Object>> questions = new ArrayList<>();
        for (Question q : quiz.getQuestions()) {
            Map<String, Object> qMap = new LinkedHashMap<>();
            qMap.put("id", q.getId());
            qMap.put("questionText", q.getQuestionText());
            qMap.put("optionA", q.getOptionA());
            qMap.put("optionB", q.getOptionB());
            qMap.put("optionC", q.getOptionC());
            qMap.put("optionD", q.getOptionD());
            questions.add(qMap);
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("quizId", quiz.getId());
        response.put("title", quiz.getTitle());
        response.put("timeLimit", quiz.getTimeLimit());
        response.put("totalQuestions", questions.size());
        response.put("questions", questions);
        return ApiResponse.success(response, "Quiz fetched");
    }

    @PostMapping("/{quizId}/submit")
    public ApiResponse<Map<String, Object>> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody Map<String, String> answers,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String email = "unknown";
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try { email = jwtUtils.getEmailFromToken(authHeader.substring(7)); } catch (Exception ignored) {}
        }

        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        int correct = 0;
        int total = quiz.getQuestions().size();
        List<Map<String, Object>> results = new ArrayList<>();

        for (Question q : quiz.getQuestions()) {
            String userAnswer = answers.getOrDefault(q.getId().toString(), "").toUpperCase().trim();
            String correctAns = q.getCorrectAnswer().toUpperCase().trim();
            boolean isCorrect = userAnswer.equals(correctAns);
            if (isCorrect) correct++;
            Map<String, Object> result = new LinkedHashMap<>();
            result.put("questionId", q.getId());
            result.put("question", q.getQuestionText());
            result.put("yourAnswer", userAnswer);
            result.put("correctAnswer", correctAns);
            result.put("isCorrect", isCorrect);
            results.add(result);
        }

        int score = total > 0 ? (correct * 100) / total : 0;
        boolean passed = score >= quiz.getPassingScore();

        User user = userRepository.findByEmail(email).orElse(null);
        QuizResult quizResult = QuizResult.builder()
                .quizId(quizId).userId(user != null ? user.getId() : null)
                .userEmail(email).quizTitle(quiz.getTitle())
                .score(score).correct(correct).total(total).passed(passed).build();
        quizResultRepository.save(quizResult);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("score", score); response.put("correct", correct);
        response.put("total", total); response.put("passed", passed);
        response.put("results", results);
        return ApiResponse.success(response, "Quiz submitted");
    }

    @GetMapping("/history")
    public ApiResponse<List<QuizResult>> getHistory(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        String email = "unknown";
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            try { email = jwtUtils.getEmailFromToken(authHeader.substring(7)); } catch (Exception ignored) {}
        }
        return ApiResponse.success(quizResultRepository.findByUserEmail(email), "History fetched");
    }

    // ========== ADMIN ENDPOINTS ==========

    @PostMapping
    public ApiResponse<Map<String, Object>> createQuiz(@RequestBody Quiz quiz) {
        quiz.setActive(true);
        Quiz saved = quizRepository.save(quiz);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", saved.getId());
        result.put("title", saved.getTitle());
        result.put("courseId", saved.getCourseId());
        result.put("timeLimit", saved.getTimeLimit());
        result.put("passingScore", saved.getPassingScore());
        return ApiResponse.success(result, "Quiz created");
    }

    @GetMapping
    public ApiResponse<List<Map<String, Object>>> getAllQuizzes() {
        List<Map<String, Object>> list = new ArrayList<>();
        quizRepository.findAll().forEach(q -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", q.getId());
            map.put("title", q.getTitle());
            map.put("description", q.getDescription());
            map.put("courseId", q.getCourseId());
            map.put("timeLimit", q.getTimeLimit());
            map.put("passingScore", q.getPassingScore());
            map.put("questions", q.getQuestions().stream().map(qs -> {
                Map<String, Object> qm = new LinkedHashMap<>();
                qm.put("id", qs.getId());
                qm.put("questionText", qs.getQuestionText());
                qm.put("optionA", qs.getOptionA());
                qm.put("optionB", qs.getOptionB());
                qm.put("optionC", qs.getOptionC());
                qm.put("optionD", qs.getOptionD());
                qm.put("correctAnswer", qs.getCorrectAnswer());
                return qm;
            }).toList());
            list.add(map);
        });
        return ApiResponse.success(list, "Quizzes fetched");
    }

    @PostMapping("/{quizId}/questions")
    public ApiResponse<Map<String, Object>> addQuestion(@PathVariable Long quizId, @RequestBody Question question) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        question.setQuiz(quiz);
        quiz.getQuestions().add(question);
        quizRepository.save(quiz);
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", question.getId());
        result.put("questionText", question.getQuestionText());
        return ApiResponse.success(result, "Question added");
    }

    @DeleteMapping("/{quizId}")
    public ApiResponse<String> deleteQuiz(@PathVariable Long quizId) {
        quizRepository.deleteById(quizId);
        return ApiResponse.success("Deleted", "Quiz deleted");
    }
}