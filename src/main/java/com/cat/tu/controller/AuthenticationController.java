package com.cat.tu.controller;

import com.cat.tu.entity.User;
import com.cat.tu.service.UserService;
import com.cat.tu.util.JWTUtil;
import com.cat.tu.util.model.FollowingData;
import com.cat.tu.util.model.UserDataLoginDTO;
import com.cat.tu.util.model.UserLoginData;
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
    public HttpStatus getDefault(@RequestBody UserLoginData loginData) {
        User user = new User(loginData.getUsername(), passwordEncoder.encode(loginData.getPassword()), "ROLE_USER");
        if (userService.saveUser(user).isPresent())
            return HttpStatus.CREATED;
        else
            return HttpStatus.CONFLICT;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDataLoginDTO> loginHandler(@RequestBody UserLoginData loginData){
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword());

            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(loginData.getUsername());
            User user = userService.getUser(loginData.getUsername()).get();

            return new ResponseEntity<>(new UserDataLoginDTO(user,
                    new FollowingData(user.getFollowing(), user.getFollowers()), token), HttpStatus.OK);
        } catch (AuthenticationException authExc){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
