package com.codenexus.auth;

import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // ===== GET ALL USERS =====
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ===== EXCEL EXPORT =====
    public byte[] exportUsersToExcel() throws IOException {
        List<User> users = userRepository.findAll();
        
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Users");
            
            // Create header row
            Row header = sheet.createRow(0);
            String[] columns = {"ID", "Full Name", "Email", "Password", "Role", "Active", "Created At", "Last Active At"};
            for (int i = 0; i < columns.length; i++) {
                Cell cell = header.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(getHeaderCellStyle(workbook));
            }
            
            // Fill data rows
            int rowNum = 1;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            
            for (User user : users) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(user.getId());
                row.createCell(1).setCellValue(user.getFullName());
                row.createCell(2).setCellValue(user.getEmail());
                row.createCell(3).setCellValue(user.getPassword()); // Hashed password
                row.createCell(4).setCellValue(user.getRole() != null ? user.getRole() : "STUDENT");
                row.createCell(5).setCellValue(user.isActive());
                row.createCell(6).setCellValue(user.getCreatedAt() != null ? user.getCreatedAt().format(formatter) : "");
                row.createCell(7).setCellValue(user.getLastActiveAt() != null ? user.getLastActiveAt().format(formatter) : "");
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
    public int importUsersFromExcel(MultipartFile file) throws IOException {
        List<User> users = parseExcelToUsers(file);
        List<User> savedUsers = userRepository.saveAll(users);
        return savedUsers.size();
    }

    private List<User> parseExcelToUsers(MultipartFile file) throws IOException {
        List<User> users = new ArrayList<>();
        
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            
            // Skip header row (row 0)
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;
                
                User user = new User();
                
                // ID - check if exists to avoid duplicate
                Cell idCell = row.getCell(0);
                if (idCell != null && idCell.getCellType() == CellType.NUMERIC) {
                    Long existingId = (long) idCell.getNumericCellValue();
                    // Check if user already exists
                    if (userRepository.existsById(existingId)) {
                        continue; // Skip existing users
                    }
                    user.setId(existingId);
                }
                
                user.setFullName(getCellValue(row.getCell(1)));
                user.setEmail(getCellValue(row.getCell(2)));
                user.setPassword(getCellValue(row.getCell(3))); // Hashed password
                user.setRole(getCellValue(row.getCell(4)));
                
                // Active
                Cell activeCell = row.getCell(5);
                if (activeCell != null) {
                    user.setActive(activeCell.getBooleanCellValue());
                } else {
                    user.setActive(true);
                }
                
                // Created At
                String createdAtStr = getCellValue(row.getCell(6));
                if (!createdAtStr.isEmpty()) {
                    try {
                        user.setCreatedAt(LocalDateTime.parse(createdAtStr, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                    } catch (Exception e) {
                        user.setCreatedAt(LocalDateTime.now());
                    }
                } else {
                    user.setCreatedAt(LocalDateTime.now());
                }
                
                user.setUpdatedAt(LocalDateTime.now());
                users.add(user);
            }
        }
        return users;
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