package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Application;
import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.dto.ApplicationDto;

public class ApplicationMapper {
    public static ApplicationDto mapToApplicationDto(Application Application){
        if (Application.getInternshipid() == null) {
            return new ApplicationDto(
                Application.getApplicationid(),
                Application.getName(),
                Application.getEmail(),
                Application.getPhone_nr(),
                Application.getAge(),
                Application.getCity(),
                Application.getDescription(),
                Application.getGender(),
                Application.getJobid().getId(),
                0,
                Application.getEmployeeid().getId()
            );
        }
        else
        {
            return new ApplicationDto(
                Application.getApplicationid(),
                Application.getName(),
                Application.getEmail(),
                Application.getPhone_nr(),
                Application.getAge(),
                Application.getCity(),
                Application.getDescription(),
                Application.getGender(),
                0,
                Application.getInternshipid().getId(),
                Application.getEmployeeid().getId()
            );
        }
    }
    public static Application mapToApplication(ApplicationDto Application,Job Job,Internship internship,Employee Employee){

        Application Applications = new Application();
            Applications.setApplicationid(Application.getApplicationid());
            Applications.setName(Application.getName());
            Applications.setEmail(Application.getEmail());
            Applications.setPhone_nr(Application.getPhone_nr());
            Applications.setAge(Application.getAge());
            Applications.setCity(Application.getCity());
            Applications.setDescription(Application.getDescription());
            Applications.setGender(Application.getGender());
            Applications.setJobid(Job);
            Applications.setInternshipid(internship);
            Applications.setEmployeeid(Employee);
        
        return Applications;
    }
}
