package com.capstone.finance.Service.Community;

import com.capstone.finance.Entity.Community.Comment;
import com.capstone.finance.Entity.Community.CommentDto;
import com.capstone.finance.Entity.Community.Post;
import com.capstone.finance.Repository.Community.CommentRepository;
import com.capstone.finance.Repository.Community.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public List<Comment> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        return post.getComments();
    }
    public List<CommentDto> getCommentsByUsername(String username) {
        List<Comment> comments = commentRepository.findByUsername(username);
        return comments.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    private CommentDto convertToDto(Comment comment) { //DTO 변환
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        commentDto.setUsername(comment.getUsername());
        commentDto.setCreatedAt(comment.getCreatedAt());
        return commentDto;
    }
    public Comment createComment(Long postId, Comment comment) { //댓글 작성
        Post post = postRepository.findById(postId).orElseThrow();
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    @Transactional
    public void updateComment(Long commentId, String username, String content) {  //댓글 수정
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // 사용자 권한 확인
        if (!comment.getUsername().equals(username)) {
            throw new RuntimeException("You are not authorized to update this comment");
        }

        comment.setContent(content);
        commentRepository.save(comment);
    }
    @Transactional
    public void deleteComment(Long commentId, String username) {
        // commentId로 댓글을 찾고, 없으면 예외를 던짐
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // 댓글의 작성자와 요청한 사용자가 일치하는지 확인
        if (!comment.getUsername().equals(username)) {
            throw new RuntimeException("You are not the author of this comment");
        }

        // 댓글이 속한 게시물을 가져와서 댓글 리스트에서 제거
       Post post = comment.getPost();
        post.getComments().remove(comment);

        // 댓글 삭제
        commentRepository.deleteById(commentId);
    }
}