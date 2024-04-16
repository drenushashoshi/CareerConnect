package com.example.EmoloyerSystem.Service.impl;


import com.example.EmoloyerSystem.Entity.Category;
import com.example.EmoloyerSystem.Repository.CategoryRepository;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.CategoryMapper;
import com.example.EmoloyerSystem.Service.CategoryService;
import com.example.EmoloyerSystem.dto.CategoryDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category= CategoryMapper.mapToCategory(categoryDto);
        Category savedCategory=categoryRepository.save(category);

        return CategoryMapper.mapToCategoryDto(savedCategory);
    }

    @Override
    public CategoryDto getCategoryId(Integer categoryId) {
        Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Category does not exist"));

        return CategoryMapper.mapToCategoryDto(category);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories=categoryRepository.findAll();
        return categories.stream().map(CategoryMapper::mapToCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDto updateCategory(Integer categoryId, CategoryDto updatedCategory) {
        Category category=categoryRepository.findById(categoryId).orElseThrow(
                ()-> new ResourceNotFoundException("Category does not exist")
        );
        category.setName(updatedCategory.getName());


        Category updatedCategoryObj=categoryRepository.save(category);

        return CategoryMapper.mapToCategoryDto(updatedCategoryObj);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category category=categoryRepository.findById(categoryId).orElseThrow(
                ()-> new ResourceNotFoundException("Category does not exist")
        );
        categoryRepository.deleteById(categoryId);
    }
}
