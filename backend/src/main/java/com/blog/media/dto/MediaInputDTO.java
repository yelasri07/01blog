package com.blog.media.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MediaInputDTO(
        @NotNull(message = "url should not be empty or null") @Size(max = 2000) String url,
        @JsonProperty("public_id") @NotNull(message = "publicId should not be empty or null") @Size(max = 200) String publicId) {

}
