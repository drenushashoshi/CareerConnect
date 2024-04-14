package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Application;
import com.example.EmoloyerSystem.dto.ApplicationDto;

public class ApplicationMapper {
    public static ApplicationDto mapToApplicationDto(Application Application){
        return new ApplicationDto(
            Application.getID(),
            Application.getName(),
            Application.getEmail(),
            Application.getPhoneNr(),
            Application.getAge(),
            Application.getCity(),
            Application.getDescription(),
            Application.getGender(),
            Application.getCV()
        );
    }
    public static Application mapToApplication(ApplicationDto Application){
        return new Application(
                Application.getID(),
                Application.getName(),
                Application.getEmail(),
                Application.getPhoneNr(),
                Application.getAge(),
                Application.getCity(),
                Application.getDescription(),
                Application.getGender(),
                Application.getCV()
        );
    }
}
