package com.cat.tu.util.model;

import com.cat.tu.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTResponse {
    private String jwtToken;
    private User user;
}
