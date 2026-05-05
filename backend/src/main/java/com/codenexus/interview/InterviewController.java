package com.codenexus.interview;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/interview")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InterviewController {

    private final InterviewQuestionRepository repository;

    @GetMapping("/questions")
    public List<Map<String, Object>> getAll() {
        List<Map<String, Object>> list = new ArrayList<>();
        repository.findAll().forEach(q -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", q.getId());
            map.put("category", q.getCategory());
            map.put("question", q.getQuestion());
            map.put("answer", q.getAnswer());
            map.put("difficulty", q.getDifficulty());
            list.add(map);
        });
        return list;
    }

    @PostMapping("/questions")
    public Map<String, Object> create(@RequestBody InterviewQuestion q) {
        repository.save(q);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", q.getId());
        map.put("category", q.getCategory());
        map.put("question", q.getQuestion());
        map.put("answer", q.getAnswer());
        map.put("difficulty", q.getDifficulty());
        return map;
    }

    @DeleteMapping("/questions/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        repository.deleteById(id);
        Map<String, String> response = new LinkedHashMap<>();
        response.put("status", "deleted");
        return response;
    }
}