package com.blog.cloudinary.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.blog.cloudinary.services.CloudinaryService;

@RestController
@RequestMapping("/cloudinary")
public class CloudinaryController {

    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/signature")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void getSignature() {
        cloudinaryService.getSignature();
    }

}
