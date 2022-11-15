package com.cat.tu.controller;

import com.cat.tu.entity.Post;
import com.cat.tu.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/post")
@RestController
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Post>> getTrending() {
        return new ResponseEntity<>(postService.getTrending(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getUserById(@PathVariable Long id) {
        if (id == null || id < 0)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return this.postService.getPostById(id)
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return postService.save(post) != null
                ? new ResponseEntity<>(post, HttpStatus.CREATED)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
