package com.cat.tu.dto;

import com.cat.tu.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class JwtTokenResponse extends UserDataResponse {
    private String jwtToken;

    public JwtTokenResponse() {
    }

    public JwtTokenResponse(User user, FollowingData followingData, List<PostDTO> likedPosts, String jwtToken) {
        super(user, followingData, likedPosts);
        this.jwtToken = jwtToken;
    }
}
