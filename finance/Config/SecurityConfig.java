package com.capstone.finance.Config;

import com.capstone.finance.JWT.JwtAccessDeniedHandler;
import com.capstone.finance.JWT.JwtAuthenticationEntryPoint;
//import com.capstone.finance.jwt.JwtSecurityConfig;
import com.capstone.finance.JWT.TokenProvider;
import com.capstone.finance.JWT.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CSRF 설정 Disable
        http.cors(AbstractHttpConfigurer::disable)
                .addFilter(corsFilter)
                .csrf(AbstractHttpConfigurer::disable)
                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling((exceptionConfig) ->
                        exceptionConfig.authenticationEntryPoint(jwtAuthenticationEntryPoint).accessDeniedHandler(jwtAccessDeniedHandler)
                )
                .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(authorize ->
                        authorize
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/api/**").permitAll()
                                .requestMatchers("/api/chatbot").authenticated() // 인증하지 않고 접근하려하면 401 리턴
                )
                .addFilterBefore(
                        new JwtFilter(tokenProvider),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}