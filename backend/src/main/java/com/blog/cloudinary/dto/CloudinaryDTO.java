package com.blog.cloudinary.dto;

import lombok.Builder;

@Builder
public record CloudinaryDTO(
        String signature,
        String apiKey,
        String cloudName,
        Long timestamp) {

}
