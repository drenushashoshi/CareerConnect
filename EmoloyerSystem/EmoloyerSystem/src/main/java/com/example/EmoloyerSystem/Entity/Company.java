package com.example.EmoloyerSystem.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Company")
public class Company implements UserDetails {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name="name", nullable = false)
    private String name;

    @Column(name="email", nullable = false,unique = true)
    private String email;

    @Column(name="address", nullable = false)
    private String address;

    @Column(name="phone_number", nullable = false)
    private String phone_number;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="opening_year", nullable = false)
    private int opening_year;

    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Column(name = "role", nullable = false)
    private String role;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Collection<Internship> internships;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Collection<CompanyStaff> staff;

    @OneToMany(mappedBy = "company",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Collection<Job> jobs;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
