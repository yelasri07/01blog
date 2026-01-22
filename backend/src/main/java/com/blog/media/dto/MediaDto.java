package com.blog.media.dto;

import lombok.Builder;

@Builder
public record MediaDto(
        String signature,
        String apiKey,
        String cloudName,
        Long timestamp) {

}
