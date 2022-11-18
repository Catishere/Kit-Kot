package com.cat.tu.controller;

import com.cat.tu.entity.User;
import com.cat.tu.service.UserService;
import com.cat.tu.dto.FollowingData;
import com.cat.tu.dto.UserDataResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/user")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<User> getUser(@RequestParam String username) {
        if (username == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        var user = userService.getUser(username);

        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @GetMapping("/suggested")
    public ResponseEntity<Iterable<User>> getSuggestedUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDataResponse> getUserById(@PathVariable Long id) {
        if (id == null || id < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return this.userService.getUserById(id)
                .map(user ->
                    new ResponseEntity<>(new UserDataResponse(user,
                            new FollowingData(user.getFollowing(), user.getFollowers())), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/{id}")
    public ResponseEntity<User>  createUser(@PathVariable String id) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
    }

    @PostMapping("/{user_id}/follow/{followed_id}")
    public ResponseEntity<User> followUser(@PathVariable Long user_id, @PathVariable Long followed_id) {
        try {
            User user = this.userService.followUser(user_id, followed_id);
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
