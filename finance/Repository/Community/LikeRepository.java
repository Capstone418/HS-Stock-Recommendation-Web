package com.capstone.finance.Repository.Community;

import com.capstone.finance.Entity.Community.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {


    Optional<Like> findByMemberIdAndPostId(Long memberId, Long postId);
}