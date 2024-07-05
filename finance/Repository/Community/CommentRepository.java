package com.capstone.finance.Repository.Community;

import com.capstone.finance.Entity.Community.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {



    List<Comment> findByUsername(String username);
}