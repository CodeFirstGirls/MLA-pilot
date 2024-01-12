package com.authservice.auth;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.authservice.auth.model.User;

@SpringBootTest
class AuthserviceApplicationTests {

	@Test
	void setterAndGetterTests() {
		User user = new User();
		user.setUsername("test");
		user.setPassword("password");
		System.out.println("Testing that the user name is valid");
		Assertions.assertEquals(user.getUsername(), "test");
	}
}
