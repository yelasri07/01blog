package com.blog.bootstrap;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.blog.user.model.RoleEnum;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.UserRepository;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent> {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Value("${ADMIN_USERNAME}")
    private String adminUsername;
    
    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    public AdminSeeder(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createAdministrator();
    }

    private void createAdministrator() {
        UserEntity userEntity = userRepository.findByUsername("yelasri");
        if (userEntity != null) {
            return;
        }

        UserEntity user = UserEntity.builder()
                .username(this.adminUsername)
                .email(this.adminEmail)
                .password(encoder.encode(this.adminPassword))
                .role(RoleEnum.ADMIN)
                .created_at(new Timestamp(new Date().getTime()))
                .build();

        userRepository.save(user);
    }
}