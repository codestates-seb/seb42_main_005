package com.project.mainproject.security;

import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.*;

@Configuration
@EnableWebSecurity
public class WebConfig {
    private Environment env;
    private UserService userService;
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private JwtHelper jwtHelper;
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;

    public WebConfig(Environment env, UserService userService, JwtAuthenticationFilter jwtAuthenticationFilter, JwtHelper jwtHelper, UserRepository userRepository) {
        this.env = env;
        this.userService = userService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtHelper = jwtHelper;
        this.userRepository = userRepository;
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
                    .cors(withDefaults())
                    .authorizeHttpRequests()
                    .antMatchers("/api/users/normal").permitAll()
                    .antMatchers("/api/users/store").permitAll()
                    .antMatchers("/login").permitAll()
                    .anyRequest().permitAll()
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
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(getAuthenticationManager(authenticationConfiguration), jwtHelper, userRepository);
        authenticationFilter.setAuthenticationManager(getAuthenticationManager(authenticationConfiguration));
        return authenticationFilter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE","OPTIONAL","OPTION"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Location", "Refresh"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
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
