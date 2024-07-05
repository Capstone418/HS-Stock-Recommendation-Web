package com.capstone.finance.Controller;

import com.capstone.finance.Entity.Community.Comment;
import com.capstone.finance.Entity.Community.CommentDto;
import com.capstone.finance.Entity.Community.UpdateCommentRequest;
import com.capstone.finance.Service.Community.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/{postId}")  //게시물에 속해있는 댓글 가져오기
    public List<Comment> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PostMapping("/{postId}") //댓글 작성
    public Comment createComment(@PathVariable Long postId, @RequestBody Comment comment) {
        return commentService.createComment(postId, comment);
    }
    @GetMapping("/user/{username}")  //username이 쓴 댓글 가져오기
    public List<CommentDto> getCommentsByUsername(@PathVariable String username) {
        return commentService.getCommentsByUsername(username);
    }
    @PutMapping("/{commentId}") //댓글 수정
    public ResponseEntity<?> updateComment(
            @PathVariable Long commentId,
            @RequestParam String username,
            @RequestBody UpdateCommentRequest updateCommentRequest) {
        commentService.updateComment(commentId, username, updateCommentRequest.getContent());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/{commentId}")  //댓글 삭제
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, @RequestParam String username) {
        commentService.deleteComment(commentId, username);
        return ResponseEntity.ok().build();
    }
}