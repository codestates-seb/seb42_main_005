package com.project.mainproject.security;

import com.project.mainproject.user.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebConfig {
    private Environment env;
    private UserService userService;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private JwtHelper jwtHelper;
    private AuthenticationManager authenticationManager;

    public WebConfig(Environment env, UserService userService, JwtAuthenticationFilter jwtAuthenticationFilter, JwtHelper jwtHelper) {
        this.env = env;
        this.userService = userService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtHelper = jwtHelper;
    }

    @Bean
    public AuthenticationManager getAuthenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        try {

            AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
            authenticationManagerBuilder.userDetailsService(userService);
            authenticationManager = authenticationManagerBuilder.build();

            http
                    .csrf().disable()
                    .authorizeHttpRequests()
                    .antMatchers("/api/users/normal").permitAll()
                    .antMatchers("/api/users/store").permitAll()
                    .antMatchers("/login").permitAll()
                    .anyRequest().authenticated()
            ;
//            http
//                    //.oauth2Login();

            http
                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                    .addFilter(getAuthenticationFilter(http.getSharedObject(AuthenticationConfiguration.class)))
            ;

            http
                    .authenticationManager(authenticationManager)
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            ;

        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return http.getOrBuild();
    }

    private AuthenticationFilter getAuthenticationFilter(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(getAuthenticationManager(authenticationConfiguration), jwtHelper);
        authenticationFilter.setAuthenticationManager(getAuthenticationManager(authenticationConfiguration));
        return authenticationFilter;
    }

//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository() {
//        var clientRegistration = clientRegistration();
//        return new InMemoryClientRegistrationRepository(clientRegistration);
//    }
//
//    private ClientRegistration clientRegistration() {
//        return CommonOAuth2Provider
//                .GOOGLE
//                .getBuilder("google")
//                .clientId(env.getProperty("spring.security.oauth2.client.registration.google.client-id"))
//                .clientSecret(env.getProperty("spring.security.oauth2.client.registration.google.client-secret"))
//                .build();
//    }

}
