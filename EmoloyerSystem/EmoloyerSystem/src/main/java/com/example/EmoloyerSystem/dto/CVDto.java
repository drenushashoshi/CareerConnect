    package com.example.EmoloyerSystem.dto;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;


    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public class CVDto{

        private int cvid;
        private byte[] image;
        private String name;
        private String surname;
        private String email;
        private String phone_nr;
        private String street;
        private String city;
        private String description;
        private String college;
        private String degree;
        private String highschool;
        private int employee;
    }