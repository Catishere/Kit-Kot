package com.cat.tu.dto;

import lombok.Data;

@Data
public class UserRegisterRequest {
    private String username;
    private String password;
    private String email;
    private String displayName;
}
