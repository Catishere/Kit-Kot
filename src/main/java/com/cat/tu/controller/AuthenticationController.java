package com.cat.tu.controller;

import com.cat.tu.dto.FollowingData;
import com.cat.tu.dto.JwtTokenResponse;
import com.cat.tu.dto.UserLoginRequest;
import com.cat.tu.dto.UserRegisterRequest;
import com.cat.tu.entity.User;
import com.cat.tu.service.UserService;
import com.cat.tu.util.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/auth")
@RestController
public class AuthenticationController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JWTUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder;

    public AuthenticationController(AuthenticationManager authManager,
                                    JWTUtil jwtUtil,
                                    BCryptPasswordEncoder passwordEncoder,
                                    UserService userService) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
    }

    @PostMapping("/register")
    public HttpStatus getDefault(@RequestBody UserRegisterRequest registerData) {
        User user = new User(registerData.getUsername(),
                passwordEncoder.encode(registerData.getPassword()),
                registerData.getEmail(),
                registerData.getDisplayName(),
                "nqmam.png",
                "ROLE_USER");
        if (userService.saveUser(user).isPresent())
            return HttpStatus.CREATED;
        else
            return HttpStatus.CONFLICT;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtTokenResponse> loginHandler(@RequestBody UserLoginRequest loginData){
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword());

            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(loginData.getUsername());
            User user = userService.getUser(loginData.getUsername()).get();

            return new ResponseEntity<>(new JwtTokenResponse(user,
                    new FollowingData(user.getFollowing(), user.getFollowers()), token), HttpStatus.OK);
        } catch (AuthenticationException authExc){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
