package com.authservice.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.authservice.auth.config.SecurityConfig;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;

@WebMvcTest(SecurityConfig.class)
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    public void testPublicAccessToSignupAndLogin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/signup"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/login"))
                .andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/auth/forgot-password"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

@Test
@WithMockUser
public void testAuthenticatedAccessToOtherEndpoints() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.get("/api/some/endpoint"))
            .andExpect(MockMvcResultMatchers.status().isOk());

    mockMvc.perform(MockMvcRequestBuilders.get("/api/another/endpoint"))
            .andExpect(MockMvcResultMatchers.status().isOk());
}

@Test
public void testHttpBasicAuthentication() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/some/endpoint").with(httpBasic("username", "password")))
                        .andExpect(MockMvcResultMatchers.status().isOk());
}

@Test
public void testCsrfDisabled() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/some/endpoint").with(csrf()))
                        .andExpect(MockMvcResultMatchers.status().isOk());
}
}