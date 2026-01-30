package com.blog.user.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.exception.BadRequestException;
import com.blog.exception.NotFoundException;
import com.blog.media.dto.MediaInputDTO;
import com.blog.media.model.MediaEntity;
import com.blog.media.persistence.MediaRepository;
import com.blog.user.dto.SubscribeOutputDTO;
import com.blog.user.dto.UserOutputDTO;
import com.blog.user.dto.UserProfileOutputDTO;
import com.blog.user.model.SubscribeEntity;
import com.blog.user.model.UserEntity;
import com.blog.user.persistence.SubscribeRepository;
import com.blog.user.persistence.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final SubscribeRepository subscribeRepository;
    private final MediaRepository mediaRepository;

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
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }

    public UserProfileOutputDTO getUser(Long profileUserId, Long userId) {
        return userRepository.findUserProfile(profileUserId, userId)
                .orElseThrow(() -> new NotFoundException("Whoops! user not found"));
    }

    public List<UserOutputDTO> getUsers() {
        return userRepository.findAllUsers();
    }

    public String createSubscribe(Long subscribedToId, UserEntity user) {
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

    public List<SubscribeOutputDTO> getFollowers(Long profileId) {
        userRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return subscribeRepository.findFollowers(profileId);
    }

    public List<SubscribeOutputDTO> getFollowing(Long profileId) {
        userRepository.findById(profileId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return subscribeRepository.findFollowing(profileId);
    }

    public Boolean isSubscribed(UserEntity userProfile, Long userId) {
        return subscribeRepository.existsBySubscriberIdAndSubscribedToId(userId, userProfile.getId());
    }

    @Transactional
    public void updateProfileImage(MediaInputDTO file, UserEntity user) {
        MediaEntity media = mediaRepository.findByPublicId(file.publicId())
                .orElseThrow(() -> new NotFoundException("Whoops! file not found"));

        media.setIs_done(true);
        mediaRepository.save(media);

        if (user.getProfile_image() != null) {
            Optional<MediaEntity> existingMedia = mediaRepository.findByUrl(user.getProfile_image());
            if (existingMedia.isPresent()) {
                existingMedia.get().setIs_done(false);
                mediaRepository.save(existingMedia.get());
            }
        }
        user.setProfile_image(file.url());
        userRepository.save(user);
    }

    public Map<String, Object> banUser(Long bannedUserId, UserEntity user) {
        if (bannedUserId.equals(user.getId())) {
            throw new BadRequestException("Do you want to ban/unban yourself?");
        }

        UserEntity bannedUser = userRepository.findById(bannedUserId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        bannedUser.setIs_banned(!bannedUser.getIs_banned());
        userRepository.save(bannedUser);

        String message;
        if (bannedUser.getIs_banned()) {
            message = "User banned successfully";
        } else {
            message = "User unbanned successfully";
        }

        return Map.of(
                "message", message,
                "user_id", bannedUser.getId(),
                "banned_status", bannedUser.getIs_banned());
    }

}
