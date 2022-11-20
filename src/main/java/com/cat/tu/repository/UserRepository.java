package com.cat.tu.repository;

import com.cat.tu.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends  CrudRepository<User, Long> {

    List<User> findAll();

    long count();

    void deleteById(Long id);

    @SuppressWarnings("unchecked")
    User save(User user);

    Optional<User> findUserByUsername(String username);

    Optional<User> findUserById(Long id);

    User getOne(Long id);
}
