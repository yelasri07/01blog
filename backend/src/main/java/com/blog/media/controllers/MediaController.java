package com.blog.media.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.media.dto.MediaDto;
import com.blog.media.services.MediaService;

@RestController
@RequestMapping("/media")
public class MediaController {

    private final MediaService MediaService;

    MediaController(MediaService MediaService) {
        this.MediaService = MediaService;
    }

    @PostMapping
    public void post(@RequestBody Map<String, String> mediaData) {
        this.MediaService.createMedia(mediaData);
    }

    @PostMapping("/signature")
    public MediaDto getSignature() {
        return MediaService.getSignature();
    }

}
