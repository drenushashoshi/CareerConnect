package com.example.EmoloyerSystem.CorsConfiguration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

import static org.springframework.http.HttpHeaders.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@Configuration
public class configuration {

    private static final String X_REQUESTED_WITH = "X_REQUESTED_WITH";

    @Bean
    public CorsFilter corsFilter(){
        var UrlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        var corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedHeaders(List.of(ORIGIN,ACCESS_CONTROL_ALLOW_ORIGIN,CONTENT_TYPE,ACCEPT,AUTHORIZATION,X_REQUESTED_WITH,ACCESS_CONTROL_REQUEST_METHOD,ACCESS_CONTROL_REQUEST_HEADERS,ACCESS_CONTROL_ALLOW_CREDENTIALS));
        corsConfiguration.setExposedHeaders(List.of(ORIGIN,ACCESS_CONTROL_ALLOW_ORIGIN,CONTENT_TYPE,ACCEPT,AUTHORIZATION,X_REQUESTED_WITH,ACCESS_CONTROL_REQUEST_METHOD,ACCESS_CONTROL_REQUEST_HEADERS,ACCESS_CONTROL_ALLOW_CREDENTIALS));
        corsConfiguration.setAllowedMethods(List.of(GET.name(),POST.name(),PUT.name(),PATCH.name(),DELETE.name(),OPTIONS.name()));
        UrlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);
        return new CorsFilter(UrlBasedCorsConfigurationSource);
    }
}
