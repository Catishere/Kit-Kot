package com.cat.tu.service;

import com.cat.tu.entity.Music;
import com.cat.tu.entity.Post;
import com.cat.tu.entity.User;
import com.cat.tu.repository.MusicRepository;
import com.cat.tu.repository.PostRepository;
import com.cat.tu.repository.UserRepository;
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

    public Post save(Post post) {
        Optional<User> user = userRepository.findUserById(post.getUser().getId());
        if (user.isEmpty())
            return null;

        Optional<Music> music = musicRepository.findMusicById(post.getMusic().getId());
        if(music.isEmpty())
            return null;
        post.setUser(user.get());
        post.setMusic(music.get());
        return postRepository.save(post);
    }

    public List<Post> getTrending() {
        return postRepository.findAll();
    }
}
