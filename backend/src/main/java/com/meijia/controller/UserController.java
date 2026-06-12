package com.meijia.controller;

import com.meijia.config.JwtUtil;
import com.meijia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {
        return userService.register(
            body.get("username"),
            body.get("phone"),
            body.get("password")
        );
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        return userService.login(
            body.get("username"),
            body.get("password")
        );
    }

    @GetMapping("/info")
    public Map<String, Object> getUserInfo(@RequestHeader(value = "Authorization", required = false) String auth) {
        if (auth == null || !auth.startsWith("Bearer ")) {
            return Map.of("success", false, "message", "未登录");
        }
        try {
            Long userId = jwtUtil.getUserIdFromToken(auth.substring(7));
            return userService.getUserById(userId);
        } catch (Exception e) {
            return Map.of("success", false, "message", "登录已过期");
        }
    }
}
