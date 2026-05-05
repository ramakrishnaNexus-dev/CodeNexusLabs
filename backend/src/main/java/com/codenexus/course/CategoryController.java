package com.codenexus.course;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ApiResponse<List<Category>> getAll() {
        return ApiResponse.success(categoryRepository.findAll(), "Categories fetched");
    }

    @PostMapping
    public ApiResponse<Category> create(@RequestBody Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            return ApiResponse.error("Category already exists");
        }
        return ApiResponse.success(categoryRepository.save(category), "Category created");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ApiResponse.success("Deleted", "Category deleted");
    }
}