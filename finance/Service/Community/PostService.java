package com.capstone.finance.Service.Community;

import com.capstone.finance.Entity.Community.CommentDto;
import com.capstone.finance.Entity.Community.Post;
import com.capstone.finance.Entity.Community.PostDto;
import com.capstone.finance.Repository.Community.PostRepository;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public PostDto getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return convertToDto(post);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Transactional
    public void deletePost(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // 게시물을 삭제하기 전에 사용자 이름을 확인하거나 권한을 검사합니다.
        if (!post.getUsername().equals(username)) {
            throw new RuntimeException("You are not authorized to delete this post");
        }

        postRepository.delete(post);
    }

    @Transactional
    public Post updatePost(Long postId, String username, PostDto postDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getUsername().equals(username)) {
            throw new RuntimeException("You are not allowed to update this post");
        }

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());

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

            byte[] imageBytes = Base64.decodeBase64(base64Data);
            post.setImage(imageBytes);
        }

        return postRepository.save(post);
    }
    public void incrementLikes(Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setLikeCount(post.getLikeCount() + 1);
        postRepository.save(post);
    }
    public List<PostDto> getPostsByUsername(String username) {
        List<Post> posts = postRepository.findByUsername(username);
        return posts.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    public PostDto convertToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setUsername(post.getUsername());
        postDto.setLikeCount(post.getLikeCount());
        postDto.setCreatedAt(post.getCreatedAt());

        // Convert image byte[] to Base64 string
        if (post.getImage() != null) {
            String imageData = Base64.encodeBase64String(post.getImage());
            postDto.setImage(imageData);
        }

        postDto.setComments(post.getComments().stream()
                .map(comment -> {
                    CommentDto commentDto = new CommentDto();
                    commentDto.setId(comment.getId());
                    commentDto.setContent(comment.getContent());
                    commentDto.setUsername(comment.getUsername());
                    commentDto.setCreatedAt(comment.getCreatedAt());
                    return commentDto;
                })
                .collect(Collectors.toList()));

        return postDto;
    }
}