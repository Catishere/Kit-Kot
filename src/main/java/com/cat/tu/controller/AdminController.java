package com.cat.tu.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/admin")
@RestController
public class AdminController {

    public AdminController() {

    }

    @GetMapping("/test")
    public ResponseEntity<String> getDefault() {
        return new ResponseEntity<>( "Thats it", HttpStatus.OK);
    }
}
