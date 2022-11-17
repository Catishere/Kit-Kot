package com.cat.tu.dto;

import com.cat.tu.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowingData {
    private List<User> following;
    private List<User> followers;
}