package com.codenexus.course;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findByActiveTrue();
    }

    public Course getCourse(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public Course createCourse(Course course) {
        course.setActive(true);
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updated) {
        Course course = getCourse(id);
        course.setTitle(updated.getTitle());
        course.setDescription(updated.getDescription());
        course.setCategory(updated.getCategory());
        course.setDifficulty(updated.getDifficulty());
        course.setDuration(updated.getDuration());
        course.setInstructor(updated.getInstructor());
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = getCourse(id);
        course.setActive(false);
        courseRepository.save(course);
    }

    public List<Course> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }
}