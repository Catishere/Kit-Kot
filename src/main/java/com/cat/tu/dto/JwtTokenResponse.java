package com.cat.tu.dto;

import com.cat.tu.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtTokenResponse extends UserDataResponse {
    private String jwtToken;

    public JwtTokenResponse() {
    }

    public JwtTokenResponse(User user, FollowingData followingData, String jwtToken) {
        super(user, followingData);
        this.jwtToken = jwtToken;
    }
}
