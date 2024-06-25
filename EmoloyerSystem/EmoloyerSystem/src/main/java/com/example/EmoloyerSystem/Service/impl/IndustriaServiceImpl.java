package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.Entity.Notification;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.IndustriaMapper;
import com.example.EmoloyerSystem.Mapper.NotificationMapper;
import com.example.EmoloyerSystem.Repository.IndustriaRepository;
import com.example.EmoloyerSystem.Repository.InternshipRepository;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.Repository.NotificationRepository;
import com.example.EmoloyerSystem.Service.IndustriaService;
import com.example.EmoloyerSystem.dto.IndustriaDto;
import com.example.EmoloyerSystem.dto.NotificationDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IndustriaServiceImpl implements IndustriaService {

    private static final Logger logger = LoggerFactory.getLogger(IndustriaServiceImpl.class);

    private final IndustriaRepository industriaRepository;
    private final JobRepository jobRepository;
    private final InternshipRepository internshipRepository;
    private final NotificationRepository notificationRepository;

    @Autowired
    public IndustriaServiceImpl(IndustriaRepository industriaRepository, JobRepository jobRepository, InternshipRepository internshipRepository, NotificationRepository notificationRepository) {
        this.industriaRepository = industriaRepository;
        this.jobRepository = jobRepository;
        this.internshipRepository = internshipRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public IndustriaDto createIndustria(IndustriaDto industriaDto) {
        Industria industria = IndustriaMapper.mapToIndustria(industriaDto);
        Industria savedIndustria = industriaRepository.save(industria);
        logger.info("Created new industry: {}", savedIndustria.getName());
        return IndustriaMapper.mapToIndustriaDto(savedIndustria);
    }

    @Override
    public IndustriaDto getIndustriaName(String industriaName) {
        Industria industria = industriaRepository.findByName(industriaName)
                .orElseThrow(() -> new ResourceNotFoundException("Industria does not exist with name: " + industriaName));
        return IndustriaMapper.mapToIndustriaDto(industria);
    }

    @Override
    public List<IndustriaDto> getAllIndustries() {
        List<Industria> industries = industriaRepository.findAll();
        return industries.stream().map(IndustriaMapper::mapToIndustriaDto).collect(Collectors.toList());
    }

    @Override
    public IndustriaDto updateIndustria(String industriaName, IndustriaDto updatedIndustria) {
        Industria industria = industriaRepository.findByName(industriaName)
                .orElseThrow(() -> new ResourceNotFoundException("Industria does not exist with name: " + industriaName));
        industria.setName(updatedIndustria.getName());
        Industria updatedIndustriaObj = industriaRepository.save(industria);
        logger.info("Updated industry: {}", industriaName);
        return IndustriaMapper.mapToIndustriaDto(updatedIndustriaObj);
    }

    @Override
    public void deleteIndustria(String industriaName) {
        Industria industria = industriaRepository.findByName(industriaName)
                .orElseThrow(() -> new ResourceNotFoundException("Industria not found with name: " + industriaName));

        List<Job> jobs = jobRepository.findByIndustria(industria);
        for (Job job : jobs) {
            Company company = job.getCompany();
            String message = "Puna juaj " + job.getTitle() + " është fshirë, pasi që ne nuk do vazhdojmë bashkëpunimin me industrinë: " + industria.getName();
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setCompanyId(company.getId());
            notificationDto.setMessage(message);
            Notification notification = NotificationMapper.mapToNotification(notificationDto, company);
            notificationRepository.save(notification);
            jobRepository.delete(job);
            logger.info("Deleted job: {} and notified company: {}", job.getTitle(), company.getName());
        }

        List<Internship> internships = internshipRepository.findByIndustria(industria);
        for (Internship internship : internships) {
            Company company = internship.getCompany();
            String message = "Praktika juaj " + internship.getTitle() + " është fshirë, pasi që ne nuk do vazhdojmë bashkëpunimin me industrinë: " + industria.getName();
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setCompanyId(company.getId());
            notificationDto.setMessage(message);
            Notification notification = NotificationMapper.mapToNotification(notificationDto, company);
            notificationRepository.save(notification);
            internshipRepository.delete(internship);
            logger.info("Deleted internship: {} and notified company: {}", internship.getTitle(), company.getName());
        }

        jobRepository.deleteByIndustria(industria);
        internshipRepository.deleteByIndustria(industria);
        industriaRepository.delete(industria);
        logger.info("Deleted industry: {}", industriaName);
    }

}
