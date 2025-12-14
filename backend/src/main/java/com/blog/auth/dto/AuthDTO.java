package com.blog.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

public class AuthDTO {

    @Getter
    public static class LoginDTO {

        private String username;
        private String password;

        public void setUsername(String username) {
            if (username == null)
                return;
            this.username = username.trim();
        }

    }

    @Getter
    public static class RegisterDTO {

        @NotNull(message = "Username cannot be empty")
        @Size(min = 3, max = 20, message = "Username should be between 3 and 20 characters")
        @Pattern(regexp = "\\w*", message = "Username most be like Youssef01, blog15zone")
        private String username;

        @NotNull(message = "Email cannot be empty")
        @Email(message = "Please provide a valid email")
        private String email;

        @NotNull(message = "Password cannot be empty")
        @Size(min = 8, max = 30, message = "Password should be between 8 and 30 characters")
        private String password;

        public void setUsername(String username) {
            this.username = username.trim();
        }

        public void setEmail(String email) {
            this.email = email.trim();
        }
    }

}
