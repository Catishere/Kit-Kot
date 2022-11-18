package com.cat.tu.dto;

import com.cat.tu.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDataResponse {
    protected User user;
    protected FollowingData followingData;
}
