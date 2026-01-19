package com.blog.cloudinary.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.blog.cloudinary.dto.CloudinaryDTO;
import com.blog.exception.NotFoundException;
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

    public List<String> moveTempFiles(List<String> links) {
        List<String> newLinks = new ArrayList<>();

        for (String link : links) {
            try {
                String publicId = this.extractPublicIdFromUrl(link);
                if (publicId == null) {
                    newLinks.add(link);
                    continue;
                }
                String newPublicId = publicId.replace("tempFiles/", "blogImages/");
                newLinks.add(link.replace("tempFiles/", "blogImages/"));
                cloudinary.uploader().rename(
                        publicId,
                        newPublicId,
                        ObjectUtils.asMap(
                                "overwrite", true,
                                "invalidate", true));
            } catch (Exception e) {
                throw new NotFoundException(e.getMessage());
            }
        }

        return newLinks;
    }

    private String extractPublicIdFromUrl(String url) {
        int tempFilesIndex = url.indexOf("tempFiles/");
        int lastPointIndex = url.lastIndexOf(".");
        if (tempFilesIndex == -1 || lastPointIndex == -1) {
            return null;
        }

        try {
            return url.substring(tempFilesIndex, lastPointIndex);
        } catch (Exception e) {
            return null;
        }
    }
}