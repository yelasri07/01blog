package com.blog.user.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.media.dto.MediaInputDTO;
import com.blog.user.dto.SubscribeOutputDTO;
import com.blog.user.dto.UserOutputDTO;
import com.blog.user.dto.UserProfileOutputDTO;
import com.blog.user.model.UserEntity;
import com.blog.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserOutputDTO getMe(@AuthenticationPrincipal UserEntity user) {
        return UserOutputDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().toString())
                .createdAt(user.getCreated_at())
                .build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserOutputDTO> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public UserProfileOutputDTO getUserProfile(@PathVariable Long userId, @AuthenticationPrincipal UserEntity user) {
        return userService.getUser(userId, user.getId());
    }

    @PostMapping("/{subscribedToId}/subscribe")
    public UserProfileOutputDTO post(@PathVariable Long subscribedToId,
            @AuthenticationPrincipal UserEntity user) {
        userService.createSubscribe(subscribedToId, user);
        return userService.getUser(subscribedToId, user.getId());
    }

    @GetMapping("/{profileId}/followers")
    public List<SubscribeOutputDTO> getFollowers(@PathVariable Long profileId) {
        return userService.getFollowers(profileId);
    }

    @GetMapping("/{profileId}/following")
    public List<SubscribeOutputDTO> getFollowing(@PathVariable Long profileId) {
        return userService.getFollowing(profileId);
    }

    @PatchMapping("/profileImage")
    public UserProfileOutputDTO updateProfileImage(@Valid @RequestBody MediaInputDTO file,
            @AuthenticationPrincipal UserEntity user) {
        userService.updateProfileImage(file, user);
        return userService.getUser(user.getId(), user.getId());
    }

    @PutMapping("{userId}/ban")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> banUser(@PathVariable("userId") Long bannedUserId,
            @AuthenticationPrincipal UserEntity user) {
        return userService.banUser(bannedUserId, user);
    }

    @DeleteMapping("{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> delete(@PathVariable("userId") Long deletedUserId,
            @AuthenticationPrincipal UserEntity user) {
        return userService.deleteUser(deletedUserId, user);
    }
}
