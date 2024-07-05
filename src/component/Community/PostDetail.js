import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Button, Form, Spinner, Pagination, Alert } from 'react-bootstrap';

const PostDetail = ({ post: initialPost, onDelete, onUpdate }) => {
    const [post, setPost] = useState(initialPost);
    const [comments, setComments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialPost.title);
    const [content, setContent] = useState(initialPost.content);
    const [image, setImage] = useState(null); // 이미지
    const [imagePreview, setImagePreview] = useState(initialPost.image ? `data:image/png;base64,${initialPost.image}` : null); // State for storing the image preview
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);// 현재 페이지 번호
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [commentErrorMessage, setCommentErrorMessage] = useState('');
    const commentsPerPage = 5; //페이지당 댓글 수
    const pageNumberLimit = 10;//페이지 번호 제한
    const username = localStorage.getItem("username"); // 현재 로그인한 사용자 이름

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {

        setPost(initialPost);
        setTitle(initialPost.title);
        setContent(initialPost.content);
        setImagePreview(initialPost.image ? `data:image/png;base64,${initialPost.image}` : null);
    }, [initialPost]);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/community/comments/${post.id}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments([]); // 오류 발생 시 빈 배열로 설정
        }
        setIsLoading(false);
    };

    const handleCreateComment = async (comment) => {
        if (!comment.content) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`/api/community/comments/${post.id}`, comment);
            setComments([response.data, ...comments]);
            setCommentErrorMessage('');
        } catch (error) {
            console.error('Error creating comment:', error);
        }
        setIsLoading(false);
    };

    const handleDeleteComment = async (commentId) => {
        setIsLoading(true);
        try {
            const username = localStorage.getItem("username");
            await axios.delete(`/api/community/comments/${post.id}/${commentId}`, { params: { username } });
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
        setIsLoading(false);
    };

    const handleDeletePost = () => {
        const username = localStorage.getItem("username");
        onDelete(post.id, username);
    };

    const handleUpdatePost = async () => {
        if (!title || !content) {
            return;
        }

        if (title.length > 30) {
            setErrorMessage('제목은 30자 이하여야 합니다.');
            return;
        }

        const username = localStorage.getItem("username");
        setIsLoading(true);

        const updatePostData = { title, content };

        if (image) {
            const reader = new FileReader(); //파일 입력
            reader.onload = async (event) => {
                updatePostData.image = event.target.result;

                try {
                    await axios.put(`/api/community/posts/${post.id}`, updatePostData, { params: { username } });

                    onUpdate();

                    setIsEditing(false);
                    setErrorMessage('');
                } catch (error) {
                    console.error('Error updating post:', error);
                }
                setIsLoading(false);
                document.location.href = '/community';
            };
            reader.readAsDataURL(image);
        } else {
            try {
                await axios.put(`/api/community/posts/${post.id}`, updatePostData, { params: { username } });

                onUpdate();

                setIsEditing(false);
                setErrorMessage('');
            } catch (error) {
                console.error('Error updating post:', error);
            }
            setIsLoading(false);
            document.location.href = '/community';
        }
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setImage(selectedFile);

            // Update image preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(selectedFile);

            setErrorMessage('');
        } else {
            setImage(null);
            setImagePreview(null);
            setErrorMessage('이미지 파일만 업로드 가능합니다.');
        }
    };

    const handleLikePost = async () => {
        try {
            const username = localStorage.getItem("username");
            await axios.post(`/api/community/posts/${post.id}/like`, null, { params: { username } });
            setPost({ ...post, likeCount: post.likeCount + 1 }); // 추천기능
        } catch (error) {
            if (error.response.status === 400) { //1계정당 게시물 1회 추천 가능
                alert("추천은 1회만 가능합니다.");
            } else {
                console.error('Error liking post:', error);
            }
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNextbtn = () => { //페이지 다음버튼
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => { //페이지 이전 버튼
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    // Sort comments by createdAt in descending order
    const sortedComments = comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = sortedComments.slice(indexOfFirstComment, indexOfLastComment);

    const pages = [];
    for (let i = 1; i <= Math.ceil(sortedComments.length / commentsPerPage); i++) {
        pages.push(i);
    }

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                    {number}
                </Pagination.Item>
            );
        } else {
            return null;
        }
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // 댓글 수정 및 삭제 버튼 표시 여부 확인 함수
    const canModifyComment = (commentUsername) => {
        return commentUsername === username;
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}> {/* 폼 크기를 줄이기 위해 maxWidth 적용 */}
            {isEditing ? (
                <div>
                    <Form>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form.Group controlId="formTitle">
                            <Form.Label>제목</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formContent">
                            <Form.Label>내용</Form.Label>
                            <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>이미지 첨부</Form.Label>
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />}
                        </Form.Group>
                        <Button variant="primary" onClick={handleUpdatePost}>
                            {isLoading ? <Spinner as="span" animation="border" size="sm" /> : '저장'}
                        </Button>
                    </Form>
                </div>
            ) : (
                <div>
                    <p><img alt="" src="user_64.png"
                            width="50" height="50" /> {' '}{post.username}</p>
                    <h2>{post.title}</h2>
                    <p style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{post.content}</p> {/* whiteSpace: 'pre-wrap' 추가 */}
                    {post.image && <img src={`data:image/png;base64,${post.image}`} alt="Post Image" style={{ maxWidth: '100%', height: 'auto' }} />}
                    <p>{formatDate(post.createdAt)}</p>
                    <p><img alt="" src="chat.png" width="20" height="20" /> {comments.length} <img alt="" src="like.png" width="20" height="20" /> {post.likeCount}</p>
                    {username === post.username && (
                        <>
                            <Button variant="primary" onClick={() => setIsEditing(true)}>수정</Button>
                            <Button variant="danger" onClick={handleDeletePost}>삭제</Button>
                        </>
                    )}

                    <Button variant="success" onClick={handleLikePost}>추천</Button>

                </div>
            )}

            {isLoading ? <Spinner animation="border" /> : (
                <>
                    {commentErrorMessage && <Alert variant="danger">{commentErrorMessage}</Alert>}
                    {username && (
                        <CommentForm onCreateComment={handleCreateComment} />
                    )}
                    <CommentList
                        comments={currentComments}
                        setComments={setComments}
                        onDelete={handleDeleteComment}
                        disableActions={!username} // 현재 로그인한 사용자가 아니면 수정 및 삭제 비활성화
                        canModifyComment={canModifyComment} // Ensure this line is present
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Pagination className="mt-4">
                            <Pagination.Prev onClick={handlePrevbtn} disabled={currentPage === 1} />
                            {renderPageNumbers}
                            <Pagination.Next onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1]} />
                        </Pagination>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostDetail;