package com.codenexus.resume;

import java.util.Map;
import java.util.List;

public class ResumeDTO {
    private Long id;
    private String title;
    private Integer templateId;
    private Map<String, Object> contactInfo;
    private String summary;
    private List<Map<String, Object>> experience;
    private List<Map<String, Object>> education;
    private Map<String, Object> skills;
    private List<Map<String, Object>> projects;
    private List<Map<String, Object>> certifications;
    private List<Map<String, Object>> languages;
    private List<Map<String, Object>> achievements;
    private List<Map<String, Object>> customSections;
    private Boolean isActive;
    private String createdAt;
    private String updatedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getTemplateId() { return templateId; }
    public void setTemplateId(Integer templateId) { this.templateId = templateId; }

    public Map<String, Object> getContactInfo() { return contactInfo; }
    public void setContactInfo(Map<String, Object> contactInfo) { this.contactInfo = contactInfo; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public List<Map<String, Object>> getExperience() { return experience; }
    public void setExperience(List<Map<String, Object>> experience) { this.experience = experience; }

    public List<Map<String, Object>> getEducation() { return education; }
    public void setEducation(List<Map<String, Object>> education) { this.education = education; }

    public Map<String, Object> getSkills() { return skills; }
    public void setSkills(Map<String, Object> skills) { this.skills = skills; }

    public List<Map<String, Object>> getProjects() { return projects; }
    public void setProjects(List<Map<String, Object>> projects) { this.projects = projects; }

    public List<Map<String, Object>> getCertifications() { return certifications; }
    public void setCertifications(List<Map<String, Object>> certifications) { this.certifications = certifications; }

    public List<Map<String, Object>> getLanguages() { return languages; }
    public void setLanguages(List<Map<String, Object>> languages) { this.languages = languages; }

    public List<Map<String, Object>> getAchievements() { return achievements; }
    public void setAchievements(List<Map<String, Object>> achievements) { this.achievements = achievements; }

    public List<Map<String, Object>> getCustomSections() { return customSections; }
    public void setCustomSections(List<Map<String, Object>> customSections) { this.customSections = customSections; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}