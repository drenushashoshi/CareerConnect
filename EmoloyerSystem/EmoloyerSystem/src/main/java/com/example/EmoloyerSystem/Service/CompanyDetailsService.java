package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CompanyDetailsService implements UserDetailsService {
    @Autowired
    private CompanyRepository companyRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return companyRepository.findByEmail(username)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("User not found with username: " + username);
                });
    }

}
