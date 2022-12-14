package com.cat.tu.service;

import com.cat.tu.entity.Post;
import com.cat.tu.entity.User;
import com.cat.tu.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<User> getSuggestedUsers() {
        return userRepository
                .findAll()
                .stream()
                .sorted((u1, u2) -> u2.getFollowers().size() - u1.getFollowers().size())
                .limit(3)
                .toList();
    }

    public User followUser(String username, Long followed_id) {
        User user = userRepository.findUserByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
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

    public List<Post> getUserLikedPosts(String username) {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getLikedPosts();
    }


    public Iterable<User> searchUsers(String username) {
        return userRepository.findUsersByUsernameContaining(username);
    }
}
