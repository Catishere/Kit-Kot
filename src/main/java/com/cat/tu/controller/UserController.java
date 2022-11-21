package com.cat.tu.controller;

import com.cat.tu.dto.FollowingData;
import com.cat.tu.dto.PostDTO;
import com.cat.tu.dto.UserDataResponse;
import com.cat.tu.entity.Post;
import com.cat.tu.entity.User;
import com.cat.tu.service.UserService;
import com.cat.tu.util.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/user")
@RestController
public class UserController {
    private final UserService userService;

    private final JWTUtil jwtUtil;

    public UserController(UserService userService, JWTUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<UserDataResponse> getUser(@RequestParam String username) {
        if (username == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        var user = userService.getUser(username);

        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        User u = user.get();

        return new ResponseEntity<>(new UserDataResponse(u,
                new FollowingData(u.getFollowing(), u.getFollowers()), null), HttpStatus.OK);
    }

    @GetMapping("/suggested")
    public ResponseEntity<Iterable<User>> getSuggestedUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{username}/liked")
    public ResponseEntity<List<Post>> getLikedPosts(@PathVariable String username) {
        return new ResponseEntity<>(userService.getUserLikedPosts(username), HttpStatus.OK);
    }

    @GetMapping("/self")
    public ResponseEntity<UserDataResponse> getUserById(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.validateTokenAndRetrieveSubject(token.substring("Bearer ".length()));
        return this.userService.getUser(username)
                .map(user ->
                        new ResponseEntity<>(new UserDataResponse(user,
                                new FollowingData(user.getFollowing(), user.getFollowers()),
                                user.getLikedPosts().stream().map((p) -> new PostDTO(p.getId())).toList()),
                                HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/{id}")
    public ResponseEntity<User>  createUser(@PathVariable String id) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

    @PostMapping("/follow/{followId}")
    public ResponseEntity<User> followUser(@PathVariable Long followId, @RequestHeader("Authorization") String token) {

        String username = jwtUtil.validateTokenAndRetrieveSubject(token.substring("Bearer ".length()));
        try {
            User user = this.userService.followUser(username, followId);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}/following")
    public ResponseEntity<FollowingData> getFollowing(@PathVariable Long id) {
        if (id == null || id < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return this.userService.getUserById(id)
            .map(value ->
                    new ResponseEntity<>(new FollowingData(value.getFollowing(), value.getFollowers()), HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
