package com.capstone.finance.Repository.Community;

import com.capstone.finance.Entity.Community.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUsername(String username);
}

