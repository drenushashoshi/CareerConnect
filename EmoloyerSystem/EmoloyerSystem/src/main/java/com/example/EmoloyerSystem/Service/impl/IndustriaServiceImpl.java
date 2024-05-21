package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Repository.IndustriaRepository;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.IndustriaMapper;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.Service.IndustriaService;
import com.example.EmoloyerSystem.dto.IndustriaDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IndustriaServiceImpl implements IndustriaService {

    private final IndustriaRepository industriaRepository;
    private final JobRepository jobRepository;

    public IndustriaServiceImpl(IndustriaRepository industriaRepository, JobRepository jobRepository) {
        this.industriaRepository = industriaRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public IndustriaDto createIndustria(IndustriaDto industriaDto) {
        Industria industria = IndustriaMapper.mapToIndustria(industriaDto);
        Industria savedIndustria = industriaRepository.save(industria);
        return IndustriaMapper.mapToIndustriaDto(savedIndustria);
    }

    @Override
    public IndustriaDto getIndustriaName(String industriaName) {
        Industria industria = industriaRepository.findByName(industriaName)
                .orElseThrow(() -> new ResourceNotFoundException("Industria does not exist"));
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
                .orElseThrow(() -> new ResourceNotFoundException("Industria does not exist"));
        industria.setName(updatedIndustria.getName());
        Industria updatedIndustriaObj = industriaRepository.save(industria);
        return IndustriaMapper.mapToIndustriaDto(updatedIndustriaObj);
    }

    @Override
    public void deleteIndustria(String industriaName) {
        Industria industria = industriaRepository.findByName(industriaName)
                .orElseThrow(() -> new ResourceNotFoundException("Industria not found with name: " + industriaName));

        // Delete associated jobs
        jobRepository.deleteByIndustria(industria);

        // Then delete the Industria
        industriaRepository.delete(industria);
    }

}
