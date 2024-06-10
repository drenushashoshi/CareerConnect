package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.Mapper.EmployeeMapper;
import com.example.EmoloyerSystem.Repository.EmployeeRepository;
import com.example.EmoloyerSystem.dto.EmployeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public EmployeeDto register(EmployeeDto registrationRequest) {
        EmployeeDto response = new EmployeeDto();
        try {
            Employee employee = EmployeeMapper.mapDtoToEmployee(registrationRequest);
            employee.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            Employee savedEmployee = employeeRepository.save(employee);

            if (savedEmployee.getId() > 0) {
                // Authenticate the new employee
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        registrationRequest.getEmail(), registrationRequest.getPassword()));

                // Generate JWT token and refresh token
                String jwt = JWTUtils.generateToken(savedEmployee);
                String refreshToken = JWTUtils.generateRefreshToken(new HashMap<>(), savedEmployee);

                // Set details in the response
                response = EmployeeMapper.mapEmployeeToDto(savedEmployee);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshToken);
                response.setExpirationTime("24Hrs");
                response.setMessage("Employee registered and logged in successfully");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public EmployeeDto login(EmployeeDto loginRequest) {
        EmployeeDto response = new EmployeeDto();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()));
            Employee employee = employeeRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            String jwt = JWTUtils.generateToken(employee);
            String refreshToken = JWTUtils.generateRefreshToken(new HashMap<>(), employee);

            response = EmployeeMapper.mapEmployeeToDto(employee);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully logged in");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public EmployeeDto refreshToken(EmployeeDto refreshTokenRequest) {
        EmployeeDto response = new EmployeeDto();
        try {
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            Employee employee = employeeRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));

            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), employee)) {
                String jwt = JWTUtils.generateToken(employee);
                response = EmployeeMapper.mapEmployeeToDto(employee);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hrs");
                response.setMessage("Successfully refreshed Token");
            } else {
                response.setStatusCode(401);
                response.setMessage("Invalid refresh token");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public EmployeeDto getAllEmployees() {
        EmployeeDto employeeDto = new EmployeeDto();
        try {
            List<Employee> result = employeeRepository.findAll();
            if (!result.isEmpty()) {
                employeeDto.setEmployeeList(result.stream().map(EmployeeMapper::mapEmployeeToDto).toList());
                employeeDto.setStatusCode(200);
                employeeDto.setMessage("Successful");
            } else {
                employeeDto.setStatusCode(404);
                employeeDto.setMessage("No employees found");
            }
        } catch (Exception e) {
            employeeDto.setStatusCode(500);
            employeeDto.setMessage("Error occurred: " + e.getMessage());
        }
        return employeeDto;
    }

    public EmployeeDto getEmployeeById(Integer id) {
        EmployeeDto employeeDto = new EmployeeDto();
        try {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            employeeDto = EmployeeMapper.mapEmployeeToDto(employee);
            employeeDto.setStatusCode(200);
            employeeDto.setMessage("User with id " + id + " found successfully");
        } catch (Exception e) {
            employeeDto.setStatusCode(500);
            employeeDto.setMessage("Error occurred " + e.getMessage());
        }
        return employeeDto;
    }

    @Transactional
    public EmployeeDto deleteEmployee(Integer id) {
        EmployeeDto employeeDto = new EmployeeDto();
        try {
            Optional<Employee> employeeOptional = employeeRepository.findById(id);
            if (employeeOptional.isPresent()) {
                employeeRepository.deleteById(id);
                employeeDto.setStatusCode(200);
                employeeDto.setMessage("Employee deleted successfully");
            } else {
                employeeDto.setStatusCode(404);
                employeeDto.setMessage("Employee not found");
            }
        } catch (Exception e) {
            employeeDto.setStatusCode(500);
            employeeDto.setMessage("Error occurred while deleting employee: " + e.getMessage());
        }
        return employeeDto;
    }

    @Transactional
    public EmployeeDto updateEmployee(Integer id, Employee updatedEmployee) {
        EmployeeDto employeeDto = new EmployeeDto();
        try {
            Optional<Employee> employeeOptional = employeeRepository.findById(id);
            if (employeeOptional.isPresent()) {
                Employee existingEmployee = employeeOptional.get();
                existingEmployee.setName(updatedEmployee.getName());
                existingEmployee.setSurname(updatedEmployee.getSurname());
                existingEmployee.setEmail(updatedEmployee.getEmail());
                existingEmployee.setAddress(updatedEmployee.getAddress());
                existingEmployee.setAge(updatedEmployee.getAge());
                existingEmployee.setPhone(updatedEmployee.getPhone());
                existingEmployee.setJobPreferences(updatedEmployee.getJobPreferences());
                existingEmployee.setSkills(updatedEmployee.getSkills());
                if (updatedEmployee.getPassword() != null && !updatedEmployee.getPassword().isEmpty()) {
                    existingEmployee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
                }
                Employee savedEmployee = employeeRepository.save(existingEmployee);
                employeeDto = EmployeeMapper.mapEmployeeToDto(savedEmployee);
                employeeDto.setStatusCode(200);
                employeeDto.setMessage("Employee updated successfully");
            } else {
                employeeDto.setStatusCode(404);
                employeeDto.setMessage("Employee not found for update");
            }
        } catch (Exception e) {
            employeeDto.setStatusCode(500);
            employeeDto.setMessage("Error occurred while updating employee: " + e.getMessage());
        }
        return employeeDto;
    }

    public EmployeeDto getMyInfo(String email) {
        EmployeeDto employeeDto = new EmployeeDto();
        try {
            Employee employee = employeeRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            employeeDto = EmployeeMapper.mapEmployeeToDto(employee);
            employeeDto.setStatusCode(200);
            employeeDto.setMessage("Successful");
        } catch (Exception e) {
            employeeDto.setStatusCode(500);
            employeeDto.setMessage("Error occurred while getting employee info: " + e.getMessage());
        }
        return employeeDto;
    }
}
