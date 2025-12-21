package com.blog.user.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

import org.apache.coyote.BadRequestException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blog.exception.NotFoundException;
import com.blog.user.model.SubscribeEntity;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.SubscribeRepository;
import com.blog.user.persistence.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;
    private SubscribeRepository subscribeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = this.userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username or password is incorrect");
        }

        return user;
    }

    public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
        UserEntity user = this.userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException("Username or password is incorrect");
        }

        return user;
    }

    public String createSubscribe(Long subscribedToId, UserEntity user) throws Exception {
        if (subscribedToId.equals(user.getId())) {
            throw new BadRequestException("You cannot subscribe to yourself");
        }

        Optional<SubscribeEntity> existingSubscribe = subscribeRepository.findBySubscriberIdAndSubscribedToId(
                user.getId(),
                subscribedToId);

        if (existingSubscribe.isPresent()) {
            subscribeRepository.delete(existingSubscribe.get());
            return "Unsubscribed successfully";
        }

        UserEntity subscribedTo = userRepository.findById(subscribedToId)
                .orElseThrow(() -> new NotFoundException("Whoops, user not found"));

        SubscribeEntity subscribe = SubscribeEntity.builder()
                .created_at(new Timestamp(new Date().getTime()))
                .subscriber(user)
                .subscribedTo(subscribedTo)
                .build();

        subscribeRepository.save(subscribe);
        return "Subscribed successfully";
    }

}
