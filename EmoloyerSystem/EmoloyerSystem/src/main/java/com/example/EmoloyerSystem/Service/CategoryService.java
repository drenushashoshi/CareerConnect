package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.CategoryDto;


import java.util.List;

public interface CategoryService {
    CategoryDto createCategory(CategoryDto categoryDto);

    CategoryDto getCategoryId(Integer categoryId);
    List<CategoryDto> getAllCategories();

    CategoryDto updateCategory(Integer categoryId, CategoryDto updatedCategory);

    void deleteCategory(Integer categoryId);
}
