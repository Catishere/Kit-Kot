package com.cat.tu.util.model;

import com.cat.tu.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDataDTO {
    protected User user;
    protected FollowingData followingData;
}
