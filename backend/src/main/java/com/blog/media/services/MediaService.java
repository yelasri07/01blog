package com.blog.media.services;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.cloudinary.dto.CloudinaryDTO;
import com.blog.exception.BadRequestException;
import com.blog.media.model.MediaEntity;
import com.blog.media.persistence.MediaRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class MediaService {

    private final MediaRepository mediaRepository;
    private final Cloudinary cloudinary;

    MediaService(MediaRepository mediaRepository, Cloudinary cloudinary) {
        this.mediaRepository = mediaRepository;
        this.cloudinary = cloudinary;
    }

    public void createMedia(Map<String, String> mediaData) {
        String publicId = mediaData.get("public_id");
        if (publicId == null) {
            throw new BadRequestException("Missing public_id property");
        }
        if (publicId.length() > 300) {
            throw new BadRequestException("Public id should be valid!");
        }

        MediaEntity media = MediaEntity.builder()
                .public_id(publicId)
                .is_done(false)
                .created_at(new Timestamp(new Date().getTime()))
                .build();

        mediaRepository.save(media);
    }

    public CloudinaryDTO getSignature() {
        long timestamp = System.currentTimeMillis() / 1000;

        Map<String, Object> params = ObjectUtils.asMap(
                "timestamp", timestamp,
                "folder", "blogImages");

        String signature = cloudinary.apiSignRequest(params, cloudinary.config.apiSecret);
        return CloudinaryDTO.builder()
                .signature(signature)
                .timestamp(timestamp)
                .cloudName(cloudinary.config.cloudName)
                .apiKey(cloudinary.config.apiKey)
                .build();
    }

}
