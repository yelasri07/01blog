package com.blog.auth.dto;

import lombok.Getter;

public class AuthDTO {

    @Getter
    public static class LoginDTO {

        private String username;
        private String password;
    }

    @Getter
    public static class RegisterDTO {

        private String username;
        private String email;
        private String password;
    }

}
