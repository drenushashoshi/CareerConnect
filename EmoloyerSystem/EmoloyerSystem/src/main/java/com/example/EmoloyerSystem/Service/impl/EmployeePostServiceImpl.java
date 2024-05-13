package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.EmployeePost;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.EmployeePostMapper;
import com.example.EmoloyerSystem.Repository.EmployeePostRepository;
import com.example.EmoloyerSystem.Service.EmployeePostService;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class EmployeePostServiceImpl implements EmployeePostService {

    private EmployeePostRepository employeePostRepository;



    @Override
    public EmployeePostDto createEmployeePost(EmployeePostDto employeePostDto) {

        EmployeePost employeePost = EmployeePostMapper.mapToEmployeePost(employeePostDto);
        EmployeePost savedEmployeePost = employeePostRepository.save(employeePost);


        return EmployeePostMapper.mapToEmployeePostDto(savedEmployeePost);
    }

    @Override
    public EmployeePostDto getEmployeePostById(Long employeePostId) {
        EmployeePost employeePost=employeePostRepository.findById(Math.toIntExact(employeePostId))
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist with given id: "+employeePostId));
        return EmployeePostMapper.mapToEmployeePostDto(employeePost);
    }


    @Override
    public List<EmployeePostDto>getAllEmployeePost(){
        List<EmployeePost> employeePost=employeePostRepository.findAll();
        return employeePost.stream().map(EmployeePostMapper::mapToEmployeePostDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeePostDto updateEmployeePost(Long employeePostId,EmployeePostDto updatedEmployeePost){

        EmployeePost employeePost=employeePostRepository.findById(Math.toIntExact(employeePostId)).orElseThrow(
                ()->new ResourceNotFoundException("Employee post is not existing with given id"+employeePostId)
        );
        employeePost.setTitle(updatedEmployeePost.getTitle());
        employeePost.setContent(updatedEmployeePost.getContent());


        EmployeePost updatedEmployeePostObj=employeePostRepository.save(employeePost);
        return EmployeePostMapper.mapToEmployeePostDto(updatedEmployeePostObj);
    }

    @Override
    public void deleteEmployeePost(int employeePostId){

        EmployeePost employeePost=employeePostRepository.findById(employeePostId).orElseThrow(
                ()-> new ResourceNotFoundException("Employee post is not existing with given id:"+employeePostId)
        );
        employeePostRepository.deleteById(employeePostId);
    }




}
