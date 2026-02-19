package com.blog.search.dto;

import java.util.List;

import com.blog.post.model.BlogSearchDTO;
import com.blog.user.dto.UserSearchDTO;

import lombok.Builder;

@Builder
public record SearchOutputDTO(
        List<UserSearchDTO> users,
        List<BlogSearchDTO> blogs) {

}
