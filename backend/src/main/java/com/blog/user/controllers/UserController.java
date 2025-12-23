package com.blog.user.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.user.dto.SubscribeOutputDTO;
import com.blog.user.model.UserEntity;
import com.blog.user.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/{subscribedToId}/subscribe")
    public Map<String, String> post(@PathVariable("subscribedToId") Long subscribedToId,
            @AuthenticationPrincipal UserEntity user) {
        String subscribeMessage = userService.createSubscribe(subscribedToId, user);
        return Map.of("message", subscribeMessage);
    }

    @GetMapping("/{profileId}/followers")
    public List<SubscribeOutputDTO> getFollowers(@PathVariable("profileId") Long profileId) {
        return userService.getFollowers(profileId);
    }

    @GetMapping("/{profileId}/following")
    public List<SubscribeOutputDTO> getFollowing(@PathVariable("profileId") Long profileId) {
        return userService.getFollowing(profileId);
    }
}
