package com.blog.search.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.blog.post.model.BlogSearchDTO;
import com.blog.post.persistence.BlogRepository;
import com.blog.search.dto.SearchOutputDTO;
import com.blog.user.dto.UserSearchDTO;
import com.blog.user.persistence.UserRepository;

@Service
public class SearchService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;

    SearchService(BlogRepository blogRepository, UserRepository userRepository) {
        this.blogRepository = blogRepository;
        this.userRepository = userRepository;
    }

    public SearchOutputDTO searchByUsersAndBlogs(String value) {
        List<UserSearchDTO> users = userRepository.searchUsers(value.toLowerCase());
        List<BlogSearchDTO> blogs = blogRepository.searchBlogs(value.toLowerCase());

        return SearchOutputDTO.builder()
                .users(users)
                .blogs(blogs)
                .build();
    }

}
