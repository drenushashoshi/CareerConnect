package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.Entity.EmployeePost;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.EmployeePostMapper;
import com.example.EmoloyerSystem.Repository.EmployeePostRepository;
import com.example.EmoloyerSystem.Repository.EmployeeRepository;
import com.example.EmoloyerSystem.Service.EmployeePostService;
import com.example.EmoloyerSystem.Service.ImageUtils;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeePostServiceImpl implements EmployeePostService {

    private final EmployeePostRepository employeePostRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public EmployeePostDto createEmployeePost(EmployeePostDto employeePostDto, MultipartFile file) throws IOException {
        Employee employee = employeeRepository.findById(employeePostDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + employeePostDto.getEmployeeId()));

        EmployeePost employeePost = EmployeePostMapper.mapToEmployeePost(employeePostDto, employee);
        if (file != null && !file.isEmpty()) {
            employeePost.setImage(ImageUtils.compressImage(file.getBytes()));
        }
        employeePost.setTimestamp(employeePostDto.getTimestamp()); // Set timestamp
        EmployeePost savedEmployeePost = employeePostRepository.save(employeePost);
        return EmployeePostMapper.mapToEmployeePostDto(savedEmployeePost);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeePostDto getEmployeePostId(Integer employeePostId) {
        EmployeePost employeePost = employeePostRepository.findById(employeePostId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee post not found with id " + employeePostId));
        return EmployeePostMapper.mapToEmployeePostDto(employeePost);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeePostDto> getAllEmployeePost(int employeeId) {
        List<EmployeePost> employeePosts = employeePostRepository.findByEmployeeId(employeeId);
        return employeePosts.stream()
                .map(EmployeePostMapper::mapToEmployeePostDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmployeePostDto updateEmployeePost(Integer employeePostId, EmployeePostDto updatedEmployeePostDto, MultipartFile file) throws IOException {
        EmployeePost employeePost = employeePostRepository.findById(employeePostId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee post not found with id " + employeePostId));
        employeePost.setTitle(updatedEmployeePostDto.getTitle());
        employeePost.setContent(updatedEmployeePostDto.getContent());
        if (file != null && !file.isEmpty()) {
            employeePost.setImage(ImageUtils.compressImage(file.getBytes()));
        }
        EmployeePost updatedEmployeePost = employeePostRepository.save(employeePost);
        return EmployeePostMapper.mapToEmployeePostDto(updatedEmployeePost);
    }

    @Override
    @Transactional
    public void deleteEmployeePost(Integer employeePostId) {
        EmployeePost employeePost = employeePostRepository.findById(employeePostId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee post not found with id " + employeePostId));
        employeePostRepository.deleteById(employeePostId);
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadImage(Integer employeePostId) {
        EmployeePost employeePost = employeePostRepository.findById(employeePostId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee post not found with id " + employeePostId));
        return ImageUtils.decompressImage(employeePost.getImage());
    }
}
