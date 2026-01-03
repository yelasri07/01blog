package com.blog.exception;

public class ConflictException extends RuntimeException {
    private String propertyName;
    
    public ConflictException(String message) {
        super(message);
    }

    public ConflictException(String message, String propertyName) {
        super(message);
        this.propertyName = propertyName;
    }

    public String getPropertyName() {
        return this.propertyName;
    }
}
