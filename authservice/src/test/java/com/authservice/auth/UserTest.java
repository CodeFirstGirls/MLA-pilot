package com.authservice.auth;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import com.authservice.auth.model.User;

public class UserTest {

    @Test
    void testGettersAndSetters() {
        // Arrange
        String id = "123";
        String username = "test@example.com";
        String password = "password123";
        User user = new User();

        // Act
        user.setId(id);
        user.setUsername(username);
        user.setPassword(password);

        // Assert
        Assertions.assertEquals(id, user.getId());
        Assertions.assertEquals(username, user.getUsername());
        Assertions.assertEquals(password, user.getPassword());
    }

    @Test
    void testConstructor() {
        // Arrange
        String username = "test@example.com";
        String password = "password123";

        // Act
        User user = new User(username, password);

        // Assert
        Assertions.assertNull(user.getId());
        Assertions.assertEquals(username, user.getUsername());
        Assertions.assertEquals(password, user.getPassword());
    }
}