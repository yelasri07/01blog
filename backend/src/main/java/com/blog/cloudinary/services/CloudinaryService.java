package com.blog.cloudinary.services;

import org.springframework.stereotype.Service;
import com.cloudinary.Cloudinary;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public void getSignature() {

    }

}