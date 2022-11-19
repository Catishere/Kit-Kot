package com.cat.tu.controller;

import com.cat.tu.entity.Post;
import com.cat.tu.entity.User;
import com.cat.tu.service.PostService;
import com.cat.tu.util.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RequestMapping("/api/post")
@RestController
public class PostController {
    private final PostService postService;
    private final JWTUtil jwtUtil;

    public PostController(PostService postService, JWTUtil jwtUtil) {
        this.postService = postService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Post>> getTrending() {
        return new ResponseEntity<>(postService.getTrending(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        if (id == null || id < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return this.postService.getPostById(id)
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable String username) {
        if (username == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        var posts = this.postService.getPostsByUsername(username);
        if (posts.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(posts.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestHeader("Authorization") String token) {

        String username = jwtUtil.validateTokenAndRetrieveSubject(token.substring("Bearer ".length()));
        post.setDate(new Date());
        post.setUser(new User(username));
        post.setMusic(null);

        return postService.save(post) != null
                ? new ResponseEntity<>(post, HttpStatus.CREATED)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, @RequestHeader("Authorization") String token) {

        String username = jwtUtil.validateTokenAndRetrieveSubject(token.substring("Bearer ".length()));
        Post post = postService.likePost(username, postId);
        return post != null
                ? new ResponseEntity<>(post, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
