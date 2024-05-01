package com.military.ctfdigitalfortress.rest;

import com.military.ctfdigitalfortress.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserRestController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<Object> getProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            var user = userService.findUserByEmail(authentication.getName());
            return user.<ResponseEntity<Object>>map(value -> ResponseEntity.ok().body(Map.of(
                    "nickname", value.getNickname(),
                    "firstname", value.getFirst_name(),
                    "lastname", value.getLast_name(),
                    "email", value.getEmail(),
                    "phoneNumber", value.getPhone_number(),
                    "telegramNick", value.getTelegram_nick(),
                    "success_attemtps", value.getSuccess_attempts(),
                    "attempts", value.getAttempts()
            ))).orElseGet(() -> ResponseEntity.badRequest().body("Error"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @GetMapping("/getAuth")
    public ResponseEntity<Object> getAuth() {
        try {
            return ResponseEntity.ok().body(Map.of("authenticated", SecurityContextHolder.getContext().getAuthentication().isAuthenticated()));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Error");
        }
    }
}
