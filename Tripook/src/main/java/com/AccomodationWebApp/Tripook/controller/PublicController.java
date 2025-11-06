package com.AccomodationWebApp.Tripook.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/public")
@CrossOrigin(origins = "*")
public class PublicController {
    
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Public endpoint working!");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/test-signup")
    public ResponseEntity<?> testSignup(@RequestBody Map<String, Object> userData) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Signup endpoint working!");
        response.put("receivedData", userData.toString());
        return ResponseEntity.ok(response);
    }
}