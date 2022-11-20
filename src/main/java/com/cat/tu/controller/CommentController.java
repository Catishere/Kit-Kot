package com.cat.tu.controller;

import com.cat.tu.entity.Comment;
import com.cat.tu.service.PostService;
import com.cat.tu.util.JWTUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/comment")
@RestController
public class CommentController {
    private final PostService postService;
    private final JWTUtil jwtUtil;


    public CommentController(PostService postService, JWTUtil jwtUtil) {
        this.postService = postService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/{postId}")
    public ResponseEntity<Comment> comment(@PathVariable Long postId,
                                           @RequestBody String comment,
                                           @RequestHeader("Authorization") String token) {

        String username = jwtUtil.validateTokenAndRetrieveSubject(token.substring("Bearer ".length()));

        try {
            var res = postService.addComment(postId, username, comment);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
