

package com.capstone.finance.Service.Community;

import com.capstone.finance.Entity.Auth.Member;
import com.capstone.finance.Entity.Community.Like;
import com.capstone.finance.Entity.Community.Post;
import com.capstone.finance.Repository.Auth.MemberRepository;
import com.capstone.finance.Repository.Community.LikeRepository;
import com.capstone.finance.Repository.Community.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;


    @Transactional
    public void likePost(String username, Long postId) {
        // username으로 memberId 찾기
        Member member = memberRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Member not found"));
        Long memberId = member.getId();

        Optional<Like> existingLike = likeRepository.findByMemberIdAndPostId(memberId, postId);
        if (existingLike.isPresent()) {
            throw new RuntimeException("You have already liked this post");
        }

        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        Like like = new Like();
        like.setMember(member);
        like.setPost(post);
        likeRepository.save(like);

        post.setLikeCount(post.getLikeCount() + 1);
        postRepository.save(post);
    }
}