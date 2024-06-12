package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Mapper.EmployeeMapper;
import com.example.EmoloyerSystem.Service.EmployeeService;
import com.example.EmoloyerSystem.dto.EmployeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/public/registerE")
    public ResponseEntity<EmployeeDto> register(@RequestBody EmployeeDto employeeDto){
        return ResponseEntity.ok(employeeService.register(employeeDto));
    }

    @PostMapping("/auth/loginE")
    public ResponseEntity<EmployeeDto> login(@RequestBody EmployeeDto employeeDto){
        return ResponseEntity.ok(employeeService.login(employeeDto));
    }

    @PostMapping("/auth/refreshE")
    public ResponseEntity<EmployeeDto> refreshToken(@RequestBody EmployeeDto employeeDto){
        return ResponseEntity.ok(employeeService.refreshToken(employeeDto));
    }

    @GetMapping("/admin/getAllEmployees")
    public ResponseEntity<EmployeeDto> getAllEmployees(){
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/public/getEmployee/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Integer id){
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PutMapping("/employee/updateEmployee/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Integer id, @RequestBody EmployeeDto employeeDto){
        return ResponseEntity.ok(employeeService.updateEmployee(id, EmployeeMapper.mapDtoToEmployee(employeeDto)));
    }

    @GetMapping("/employee/getProfile")
    public ResponseEntity<EmployeeDto> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        EmployeeDto response = employeeService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/deleteEmployee/{id}")
    public ResponseEntity<EmployeeDto> deleteEmployee(@PathVariable Integer id){
        return ResponseEntity.ok(employeeService.deleteEmployee(id));
    }
}
