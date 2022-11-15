package com.cat.tu.controller;

import com.cat.tu.util.JWTUtil;
import com.cat.tu.util.model.JWTResponse;
import com.cat.tu.util.model.UserLoginData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/admin")
@RestController
public class AdminController {

    private final AuthenticationManager authManager;
    private final JWTUtil jwtUtil;

    public AdminController(AuthenticationManager authManager, JWTUtil jwtUtil) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/test")
    public ResponseEntity<String> getDefault() {
        return new ResponseEntity<>( "Thats it", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<JWTResponse> loginHandler(@RequestBody UserLoginData loginData){
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword());

            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(loginData.getUsername());

            return new ResponseEntity<>(new JWTResponse(token), HttpStatus.OK);
        } catch (AuthenticationException authExc){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
