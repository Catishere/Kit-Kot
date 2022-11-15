package com.cat.tu.repository;

import com.cat.tu.entity.Music;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MusicRepository extends  CrudRepository<Music, Long> {

    List<Music> findAll();

    long count();

    void deleteById(Long id);

    @SuppressWarnings("unchecked")
    Music save(Music music);

    Optional<Music> findMusicById(Long id);
}
