package com.cat.tu.service;

import com.cat.tu.entity.User;
import com.cat.tu.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByUsername(username);
        return user.orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public Optional<User> saveUser(User user) {
        if (getUser(user.getUsername()).isEmpty())
            return Optional.of(userRepository.save(user));
        else
            return Optional.empty();
    }

    public Optional<User> getUser(String username) {
        return userRepository.findUserByUsername(username);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public User followUser(Long user_id, Long followed_id) {
        User user = userRepository.findUserById(user_id).orElseThrow(() -> new RuntimeException("User not found"));
        User followed = userRepository.findUserById(followed_id).orElseThrow(() -> new RuntimeException("User not found"));
        if (user == followed)
            throw new RuntimeException("You can't follow yourself");

        if (user.getFollowing().contains(followed)) {
            user.getFollowing().remove(followed);
        } else {
            user.getFollowing().add(followed);
        }

        userRepository.save(user);
        return followed;
    }
}
