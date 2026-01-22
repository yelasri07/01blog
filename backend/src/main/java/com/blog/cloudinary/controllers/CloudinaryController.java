package com.blog.cloudinary.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.cloudinary.dto.CloudinaryDTO;
import com.blog.cloudinary.services.CloudinaryService;
import com.blog.exception.BadRequestException;

@RestController
@RequestMapping("/cloudinary")
public class CloudinaryController {

    private final CloudinaryService cloudinaryService;

    public CloudinaryController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    

    @DeleteMapping
    public void deleteTempFiles(@RequestBody Map<String, String[]> data) {
        try {
            cloudinaryService.deleteTempFiles(data);
        } catch (Exception e) {
            throw new BadRequestException(e.getMessage());
        }
    }

}
