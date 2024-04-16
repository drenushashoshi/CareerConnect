package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CategoryService;
import com.example.EmoloyerSystem.dto.CategoryDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/Category")


public class CategoryController {
    private CategoryService categoryService;

    //Add Category REST API
    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto){
        CategoryDto savedCategory=categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    //Read Company by id REST API
    @GetMapping("{id}")
    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("id") Integer categoryId){
        CategoryDto categoryDto= categoryService.getCategoryId(categoryId);
        return ResponseEntity.ok(categoryDto);
    }
    //Read All Categories REST API
    @GetMapping
    public ResponseEntity<List<CategoryDto>>getAllCategories(){
        List<CategoryDto>categories=categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    //Update Category REST API
    @PutMapping("{id}")
    public ResponseEntity<CategoryDto>updateCategory(@PathVariable("id") Integer categoryId,
                                                   @RequestBody CategoryDto updatedCategory){
        CategoryDto categoryDto=categoryService.updateCategory(categoryId, updatedCategory);
        return ResponseEntity.ok(categoryDto);

    }

    //Delete Company REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteCategory(@PathVariable("id") Integer categoryId){
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category Deleted");
    }
}
