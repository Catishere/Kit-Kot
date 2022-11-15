package com.cat.tu.repository;

import com.cat.tu.entity.Post;
import com.cat.tu.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends  CrudRepository<Post, Long> {

    List<Post> findAll();

    long count();

    void deleteById(Long id);

    @SuppressWarnings("unchecked")
    Post save(Post post);

    Optional<Post> findUserByUser(User user);

    Optional<Post> findPostById(Long id);
}
