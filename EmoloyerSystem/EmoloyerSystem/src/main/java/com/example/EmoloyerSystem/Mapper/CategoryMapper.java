package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Category;
import com.example.EmoloyerSystem.dto.CategoryDto;

public class CategoryMapper {
    public static CategoryDto mapToCategoryDto(Category category){
        return new CategoryDto(
                category.getId(),
                category.getName()
        );
    }
    public static Category mapToCategory(CategoryDto categoryDto){
        return new Category(
                categoryDto.getId(),
                categoryDto.getName()
        );
    }
}
