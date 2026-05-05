package com.codenexus.course;

import com.codenexus.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ApiResponse<List<Course>> getAllCourses() {
        return ApiResponse.success(courseService.getAllCourses(), "Courses fetched");
    }

    @GetMapping("/{id}")
    public ApiResponse<Course> getCourse(@PathVariable Long id) {
        return ApiResponse.success(courseService.getCourse(id), "Course fetched");
    }

    @GetMapping("/category/{category}")
    public ApiResponse<List<Course>> getByCategory(@PathVariable String category) {
        return ApiResponse.success(courseService.getCoursesByCategory(category), "Courses fetched");
    }

    @PostMapping
    public ApiResponse<Course> createCourse(@RequestBody Course course) {
        return ApiResponse.success(courseService.createCourse(course), "Course created");
    }

    @PutMapping("/{id}")
    public ApiResponse<Course> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return ApiResponse.success(courseService.updateCourse(id, course), "Course updated");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ApiResponse.success("Deleted", "Course deleted");
    }
}