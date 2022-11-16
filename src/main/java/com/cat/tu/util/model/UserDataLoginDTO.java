package com.cat.tu.util.model;

import com.cat.tu.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDataLoginDTO extends UserDataDTO {
    private String jwtToken;

    public UserDataLoginDTO() {
    }

    public UserDataLoginDTO(User user, FollowingData followingData, String jwtToken) {
        super(user, followingData);
        this.jwtToken = jwtToken;
    }
}
