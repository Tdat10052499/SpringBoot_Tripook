package com.AccomodationWebApp.Tripook.controller;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AccomodationWebApp.Tripook.dto.request.LoginRequest;
import com.AccomodationWebApp.Tripook.dto.request.SignupRequest;
import com.AccomodationWebApp.Tripook.dto.response.JwtResponse;
import com.AccomodationWebApp.Tripook.dto.response.MessageResponse;
import com.AccomodationWebApp.Tripook.entity.User;
import com.AccomodationWebApp.Tripook.repository.UserRepository;
import com.AccomodationWebApp.Tripook.security.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(), 
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String refreshToken = jwtUtils.generateRefreshToken(
            ((User) authentication.getPrincipal()).getUsername());

        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        System.out.println("=== SIGNUP REQUEST DEBUG ===");
        System.out.println("Username: " + signUpRequest.getUsername());
        System.out.println("Email: " + signUpRequest.getEmail());
        System.out.println("FirstName: " + signUpRequest.getFirstName());
        System.out.println("LastName: " + signUpRequest.getLastName());
        System.out.println("Role: " + signUpRequest.getRole());
        System.out.println("============================");
        
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                            signUpRequest.getEmail(),
                            encoder.encode(signUpRequest.getPassword()),
                            signUpRequest.getFirstName(),
                            signUpRequest.getLastName(),
                            User.Role.GUEST);

        // Set role if provided
        String strRole = signUpRequest.getRole();
        if (strRole != null && !strRole.isEmpty()) {
            switch (strRole.toUpperCase()) {
                case "HOST":
                    user.setRole(User.Role.HOST);
                    break;
                case "ADMIN":
                    user.setRole(User.Role.ADMIN);
                    break;
                default:
                    user.setRole(User.Role.GUEST);
            }
        }

        // Set phone number if provided
        if (signUpRequest.getPhoneNumber() != null && !signUpRequest.getPhoneNumber().isEmpty()) {
            user.setPhoneNumber(signUpRequest.getPhoneNumber());
        }

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}