package com.cat.tu.service;

import com.cat.tu.entity.Music;
import com.cat.tu.entity.Post;
import com.cat.tu.entity.User;
import com.cat.tu.exception.PostNotFoundException;
import com.cat.tu.repository.MusicRepository;
import com.cat.tu.repository.PostRepository;
import com.cat.tu.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final MusicRepository musicRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, MusicRepository musicRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.musicRepository = musicRepository;
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findPostById(id);
    }

    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    public Post likePost(String username, Long id) {
        var post = postRepository.findPostById(id)
                .orElseThrow(() -> new PostNotFoundException("Post not found"));
        var user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Post not found"));

        if (user.getLikedPosts().contains(post)) {
            user.getLikedPosts().remove(post);
            post.setLikes(post.getLikes() - 1);
        } else {
            user.getLikedPosts().add(post);
            post.setLikes(post.getLikes() + 1);
        }
        postRepository.save(post);
        userRepository.save(user);
        return post;
    }

    public Post save(Post post) {
        Optional<User> user;
        if (post.getUser().getId() != null) {
            user = userRepository.findUserById(post.getUser().getId());
        } else if (post.getUser().getUsername() != null) {
            user = userRepository.findUserByUsername(post.getUser().getUsername());
        } else {
            return null;
        }

        if (user.isEmpty())
            return null;

        if (post.getMusic() != null) {
            Optional<Music> music = musicRepository.findMusicById(post.getMusic().getId());
            if (music.isEmpty())
                return null;
            post.setMusic(music.get());
        }

        post.setUser(user.get());
        return postRepository.save(post);
    }

    public Optional<List<Post>> getPostsByUsername(String username) {
        return postRepository.findAllPostsByUserUsername(username);
    }

    public List<Post> getTrending() {
        return postRepository.findAll();
    }
}
