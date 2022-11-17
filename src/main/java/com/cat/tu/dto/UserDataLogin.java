package com.cat.tu.dto;

import com.cat.tu.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDataLogin extends UserData {
    private String jwtToken;

    public UserDataLogin() {
    }

    public UserDataLogin(User user, FollowingData followingData, String jwtToken) {
        super(user, followingData);
        this.jwtToken = jwtToken;
    }
}
