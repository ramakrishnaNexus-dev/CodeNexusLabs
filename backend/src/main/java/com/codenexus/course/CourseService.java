package com.codenexus.course;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

    // ===== EXCEL EXPORT =====
    public byte[] exportCoursesToExcel() throws IOException {
        List<Course> courses = courseRepository.findAll();
        
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Courses");
            
            // Create header row
            Row header = sheet.createRow(0);
            String[] columns = {"ID", "Title", "Description", "Category", "Difficulty", "Duration", "Instructor", "Students Count", "Rating", "Active"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(getHeaderCellStyle(workbook));
            }
            
            // Fill data rows
            int rowNum = 1;
            for (Course course : courses) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(course.getId());
                row.createCell(1).setCellValue(course.getTitle());
                row.createCell(2).setCellValue(course.getDescription());
                row.createCell(3).setCellValue(course.getCategory());
                row.createCell(4).setCellValue(course.getDifficulty());
                row.createCell(5).setCellValue(course.getDuration());
                row.createCell(6).setCellValue(course.getInstructor());
                row.createCell(7).setCellValue(course.getStudentsCount());
                row.createCell(8).setCellValue(course.getRating());
                row.createCell(9).setCellValue(course.isActive());
            }
            
            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return outputStream.toByteArray();
        }
    }

    // ===== EXCEL IMPORT =====
    public int importCoursesFromExcel(MultipartFile file) throws IOException {
        List<Course> courses = parseExcelToCourses(file);
        List<Course> savedCourses = courseRepository.saveAll(courses);
        return savedCourses.size();
    }

    private List<Course> parseExcelToCourses(MultipartFile file) throws IOException {
        List<Course> courses = new java.util.ArrayList<>();
        
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            
            // Skip header row (row 0)
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                
                Course course = new Course();
                course.setTitle(getCellValue(row.getCell(1)));
                course.setDescription(getCellValue(row.getCell(2)));
                course.setCategory(getCellValue(row.getCell(3)));
                course.setDifficulty(getCellValue(row.getCell(4)));
                course.setDuration(getCellValue(row.getCell(5)));
                course.setInstructor(getCellValue(row.getCell(6)));
                
                // Students Count
                Cell studentsCell = row.getCell(7);
                if (studentsCell != null) {
                    course.setStudentsCount((int) studentsCell.getNumericCellValue());
                }
                
                // Rating
                Cell ratingCell = row.getCell(8);
                if (ratingCell != null) {
                    course.setRating(ratingCell.getNumericCellValue());
                }
                
                // Active
                Cell activeCell = row.getCell(9);
                if (activeCell != null) {
                    course.setActive(activeCell.getBooleanCellValue());
                } else {
                    course.setActive(true);
                }
                
                courses.add(course);
            }
        }
        return courses;
    }

    private String getCellValue(Cell cell) {
        if (cell == null) return "";
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> String.valueOf(cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            default -> "";
        };
    }

    private CellStyle getHeaderCellStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.INDIGO.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }
}