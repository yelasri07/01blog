package com.blog.search.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog.search.dto.SearchOutputDTO;
import com.blog.search.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

    SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public SearchOutputDTO get(@RequestParam(required = true) String value) {
        return searchService.searchByUsersAndBlogs(value);
    }

}
