package com.blog.cloudinary.services;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.cloudinary.dto.CloudinaryDTO;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public CloudinaryDTO getSignature() {
        long timestamp = System.currentTimeMillis() / 1000;

        Map<String, Object> params = ObjectUtils.asMap(
                "timestamp", timestamp,
                "folder", "tempFiles");

        String signature = cloudinary.apiSignRequest(params, cloudinary.config.apiSecret);
        return CloudinaryDTO.builder()
                .signature(signature)
                .timestamp(timestamp)
                .cloudName(cloudinary.config.cloudName)
                .apiKey(cloudinary.config.apiKey)
                .build();
    }

    public void deleteTempFiles(Map<String, String[]> data) throws Exception {
        String[] publicIds = data.get("publicIds");
        if (publicIds == null) {
            throw new Exception("Missing publicIds property");
        }

        if (publicIds.length == 0) {
            return;
        }

        List<String> listPublicIds = Arrays.asList(publicIds);

        cloudinary.api().deleteResources(
                listPublicIds,
                ObjectUtils.asMap("resource_type", "image"));

        cloudinary.api().deleteResources(
                listPublicIds,
                ObjectUtils.asMap("resource_type", "video"));
    }
}