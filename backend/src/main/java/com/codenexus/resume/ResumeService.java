package com.codenexus.resume;

import com.codenexus.auth.User;
import com.codenexus.auth.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeTemplateRepository templateRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ResumeService(ResumeRepository resumeRepository, 
                         ResumeTemplateRepository templateRepository,
                         UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
        this.objectMapper = new ObjectMapper();
    }

    @Transactional
    public Resume createResume(String email, ResumeDTO resumeDTO) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new Exception("User not found"));

        Resume resume = new Resume();
        resume.setUser(user);
        resume.setTitle(resumeDTO.getTitle() != null ? resumeDTO.getTitle() : "My Resume");
        resume.setTemplateId(resumeDTO.getTemplateId() != null ? resumeDTO.getTemplateId() : 1);

        // Convert DTO fields to JSON strings
        if (resumeDTO.getContactInfo() != null) {
            resume.setContactInfo(objectMapper.writeValueAsString(resumeDTO.getContactInfo()));
        }
        if (resumeDTO.getSummary() != null) {
            resume.setSummary(resumeDTO.getSummary());
        }
        if (resumeDTO.getExperience() != null) {
            resume.setExperience(objectMapper.writeValueAsString(resumeDTO.getExperience()));
        }
        if (resumeDTO.getEducation() != null) {
            resume.setEducation(objectMapper.writeValueAsString(resumeDTO.getEducation()));
        }
        if (resumeDTO.getSkills() != null) {
            resume.setSkills(objectMapper.writeValueAsString(resumeDTO.getSkills()));
        }
        if (resumeDTO.getProjects() != null) {
            resume.setProjects(objectMapper.writeValueAsString(resumeDTO.getProjects()));
        }
        if (resumeDTO.getCertifications() != null) {
            resume.setCertifications(objectMapper.writeValueAsString(resumeDTO.getCertifications()));
        }
        if (resumeDTO.getLanguages() != null) {
            resume.setLanguages(objectMapper.writeValueAsString(resumeDTO.getLanguages()));
        }
        if (resumeDTO.getAchievements() != null) {
            resume.setAchievements(objectMapper.writeValueAsString(resumeDTO.getAchievements()));
        }
        if (resumeDTO.getCustomSections() != null) {
            resume.setCustomSections(objectMapper.writeValueAsString(resumeDTO.getCustomSections()));
        }

        resume.setIsActive(true);
        return resumeRepository.save(resume);
    }

    @Transactional
    public Resume updateResume(String email, Long resumeId, ResumeDTO resumeDTO) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new Exception("User not found"));
            
        Resume resume = resumeRepository.findActiveByUserIdAndResumeId(user.getId(), resumeId);
        if (resume == null) {
            throw new Exception("Resume not found");
        }

        if (resumeDTO.getTitle() != null) resume.setTitle(resumeDTO.getTitle());
        if (resumeDTO.getTemplateId() != null) resume.setTemplateId(resumeDTO.getTemplateId());

        if (resumeDTO.getContactInfo() != null) {
            resume.setContactInfo(objectMapper.writeValueAsString(resumeDTO.getContactInfo()));
        }
        if (resumeDTO.getSummary() != null) resume.setSummary(resumeDTO.getSummary());
        if (resumeDTO.getExperience() != null) {
            resume.setExperience(objectMapper.writeValueAsString(resumeDTO.getExperience()));
        }
        if (resumeDTO.getEducation() != null) {
            resume.setEducation(objectMapper.writeValueAsString(resumeDTO.getEducation()));
        }
        if (resumeDTO.getSkills() != null) {
            resume.setSkills(objectMapper.writeValueAsString(resumeDTO.getSkills()));
        }
        if (resumeDTO.getProjects() != null) {
            resume.setProjects(objectMapper.writeValueAsString(resumeDTO.getProjects()));
        }
        if (resumeDTO.getCertifications() != null) {
            resume.setCertifications(objectMapper.writeValueAsString(resumeDTO.getCertifications()));
        }
        if (resumeDTO.getLanguages() != null) {
            resume.setLanguages(objectMapper.writeValueAsString(resumeDTO.getLanguages()));
        }
        if (resumeDTO.getAchievements() != null) {
            resume.setAchievements(objectMapper.writeValueAsString(resumeDTO.getAchievements()));
        }
        if (resumeDTO.getCustomSections() != null) {
            resume.setCustomSections(objectMapper.writeValueAsString(resumeDTO.getCustomSections()));
        }

        return resumeRepository.save(resume);
    }

    public Resume getResume(String email, Long resumeId) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new Exception("User not found"));
            
        Resume resume = resumeRepository.findActiveByUserIdAndResumeId(user.getId(), resumeId);
        if (resume == null) {
            throw new Exception("Resume not found");
        }
        return resume;
    }

    public List<Resume> getAllResumes(String email) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new Exception("User not found"));
        return resumeRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
    }

    @Transactional
    public void deleteResume(String email, Long resumeId) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new Exception("User not found"));
            
        Resume resume = resumeRepository.findActiveByUserIdAndResumeId(user.getId(), resumeId);
        if (resume == null) {
            throw new Exception("Resume not found");
        }
        resume.setIsActive(false);
        resumeRepository.save(resume);
    }

    public List<ResumeTemplate> getAllTemplates() {
        return templateRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
    }

    public ResumeTemplate getTemplate(Long templateId) throws Exception {
        ResumeTemplate template = templateRepository.findByIdAndIsActiveTrue(templateId);
        if (template == null) {
            throw new Exception("Template not found");
        }
        return template;
    }
}