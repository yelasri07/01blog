package com.blog.post.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/blog")
@Slf4j
public class BlogController {
    
    @PostMapping
    public String post() {
        return new String();
    }
    

}
