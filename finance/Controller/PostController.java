package com.capstone.finance.Controller;

import com.capstone.finance.Entity.Community.Post;
import com.capstone.finance.Entity.Community.PostDto;
import com.capstone.finance.Service.Community.LikeService;
import com.capstone.finance.Service.Community.PostService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community/posts")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private LikeService likeService;
    @GetMapping //모든 게시물 가져오기
    public List<PostDto> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}") //게시물 가져오기
    public PostDto getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PostMapping
    public PostDto createPost(@RequestBody PostDto postDto) { //게시글 작성
        byte[] imageBytes = null;

        if (postDto.getImage() != null && !postDto.getImage().isEmpty()) {
            String base64Data = postDto.getImage();
       //     이미지 데이터가 Base64 인코딩된 문자열로 제공되므로 앞부분의 형식은 제거함
       //     PNG, JPEG, SVG 형식을 처리하고, 그 외 형식은 예외처리함
            if (base64Data.startsWith("data:image/png;base64,")) {
                base64Data = base64Data.substring("data:image/png;base64,".length());
            } else if (base64Data.startsWith("data:image/jpeg;base64,")) {
                base64Data = base64Data.substring("data:image/jpeg;base64,".length());
            } else if (base64Data.startsWith("data:image/svg+xml;base64,")) {
                base64Data = base64Data.substring("data:image/svg+xml;base64,".length());
            } else {
                throw new IllegalArgumentException("Invalid image data format");
            }


            imageBytes = Base64.decodeBase64(base64Data);
        }


        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setUsername(postDto.getUsername());
        post.setImage(imageBytes);


        post = postService.createPost(post);
        return postService.convertToDto(post);
    }
    @GetMapping("/user/{username}") //username이 쓴 게시글 가져오기
    public List<PostDto> getPostsByUsername(@PathVariable String username) {
        return postService.getPostsByUsername(username);
    }
    @DeleteMapping("/{postId}") //게시글 삭제
    public ResponseEntity<?> deletePost(@PathVariable Long postId, @RequestParam String username) {
        postService.deletePost(postId, username);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{postId}")  //게시글 수정
    public ResponseEntity<Post> updatePost(@PathVariable Long postId,@RequestParam String username, @RequestBody PostDto postDto) {
        Post updatedPost = postService.updatePost(postId, username,postDto);
        return ResponseEntity.ok(updatedPost);
    }

    @PostMapping("/{postId}/like") //추천기능
    public ResponseEntity<String> likePost(@RequestParam String username, @PathVariable Long postId) {
        try {
            likeService.likePost(username, postId);
            return ResponseEntity.ok("Post liked successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}