package com.blog.cloudinary.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.cloudinary.dto.CloudinaryDTO;
import com.blog.cloudinary.services.CloudinaryService;

@RestController
@RequestMapping("/cloudinary")
public class CloudinaryController {

    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/signature")
    public CloudinaryDTO getSignature() {
        return cloudinaryService.getSignature();
    }

    @DeleteMapping
    public void deleteTempFiles(@RequestBody Map<String, String[]> data) {
        cloudinaryService.deleteTempFiles(data);
    }

}
