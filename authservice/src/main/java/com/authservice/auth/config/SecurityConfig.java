package com.authservice.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and() // Enable CORS (configure this based on your requirements)
                .csrf().disable() // Disable CSRF (enable and configure this in production)
                .authorizeRequests()
                .antMatchers("/api/auth/signup", "/api/auth/login", "/actuator/prometheus").permitAll() // Public access to signup and login
                .anyRequest().authenticated() // All other requests need authentication
                .and()
                .httpBasic();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
