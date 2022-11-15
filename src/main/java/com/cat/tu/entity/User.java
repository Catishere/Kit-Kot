package com.cat.tu.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity(name="user")
@Getter
@Setter
@ToString
@JsonIgnoreProperties("password")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="display_name")
    private String displayName;

    @Column(name="photourl")
    private String photoURL;

    @Column(name="role")
    private String role;

    public User() {
    }

    public User(String username) {
        this.username = username;
    }
}
