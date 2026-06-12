package com.meijia.service;

import com.meijia.model.User;
import com.meijia.model.UserRepository;
import com.meijia.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> register(String username, String phone, String password) {
        Map<String, Object> result = new HashMap<>();

        if (userRepository.existsByUsername(username)) {
            result.put("success", false);
            result.put("message", "用户名已存在");
            return result;
        }

        if (userRepository.existsByPhone(phone)) {
            result.put("success", false);
            result.put("message", "手机号已注册");
            return result;
        }

        User user = new User();
        user.setUsername(username);
        user.setPhone(phone);
        user.setPassword(password);
        user.setNickname(username);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getId(), user.getUsername());

        result.put("success", true);
        result.put("message", "注册成功");
        result.put("token", token);
        result.put("user", getUserInfo(user));
        return result;
    }

    public Map<String, Object> login(String username, String password) {
        Map<String, Object> result = new HashMap<>();

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByPhone(username);
        }

        if (userOpt.isEmpty()) {
            result.put("success", false);
            result.put("message", "用户不存在");
            return result;
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(password)) {
            result.put("success", false);
            result.put("message", "密码错误");
            return result;
        }

        String token = jwtUtil.generateToken(user.getId(), user.getUsername());

        result.put("success", true);
        result.put("message", "登录成功");
        result.put("token", token);
        result.put("user", getUserInfo(user));
        return result;
    }

    public Map<String, Object> getUserById(Long id) {
        Map<String, Object> result = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            result.put("success", false);
            result.put("message", "用户不存在");
            return result;
        }

        result.put("success", true);
        result.put("user", getUserInfo(userOpt.get()));
        return result;
    }

    private Map<String, Object> getUserInfo(User user) {
        Map<String, Object> info = new HashMap<>();
        info.put("id", user.getId());
        info.put("username", user.getUsername());
        info.put("phone", user.getPhone());
        info.put("nickname", user.getNickname());
        info.put("avatar", user.getAvatar());
        info.put("role", user.getRole());
        return info;
    }
}
