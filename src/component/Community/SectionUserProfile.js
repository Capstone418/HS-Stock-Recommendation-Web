import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import CommentList from './CommentList';
import { Container, Tab, Tabs, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SectionUserProfile = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [currentPostPage, setCurrentPostPage] = useState(1);
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [maxPostPageNumberLimit, setMaxPostPageNumberLimit] = useState(10); //페이지네이션에서 표시할 페이지 번호의 최대값
    const [minPostPageNumberLimit, setMinPostPageNumberLimit] = useState(0); //페이지네이션에서 표시할 페이지 번호의 최소값
    const [maxCommentPageNumberLimit, setMaxCommentPageNumberLimit] = useState(10); //페이지네이션에서 표시할 페이지 번호의 최대값
    const [minCommentPageNumberLimit, setMinCommentPageNumberLimit] = useState(0); //페이지네이션에서 표시할 페이지 번호의 최소값
    const [searchTerm, setSearchTerm] = useState('');
    const postsPerPage = 5;
    const commentsPerPage = 5;
    const pageNumberLimit = 10; // 페이지 번호 제한

    useEffect(() => {
        fetchUserPosts();
        fetchUserComments();
    }, [username]);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`/api/community/posts/user/${username}`);
            setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const fetchUserComments = async () => {
        try {
            const response = await axios.get(`/api/community/comments/user/${username}`);
            setComments(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error fetching user comments:', error);
        }
    };

    const paginatePosts = (pageNumber) => setCurrentPostPage(pageNumber);
    const paginateComments = (pageNumber) => setCurrentCommentPage(pageNumber);

    const handleNextPostBtn = () => {
        setCurrentPostPage(currentPostPage + 1);
        if (currentPostPage + 1 > maxPostPageNumberLimit) {
            setMaxPostPageNumberLimit(maxPostPageNumberLimit + pageNumberLimit);
            setMinPostPageNumberLimit(minPostPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevPostBtn = () => {
        setCurrentPostPage(currentPostPage - 1);
        if ((currentPostPage - 1) % pageNumberLimit === 0) {
            setMaxPostPageNumberLimit(maxPostPageNumberLimit - pageNumberLimit);
            setMinPostPageNumberLimit(minPostPageNumberLimit - pageNumberLimit);
        }
    };

    const handleNextCommentBtn = () => {
        setCurrentCommentPage(currentCommentPage + 1);
        if (currentCommentPage + 1 > maxCommentPageNumberLimit) {
            setMaxCommentPageNumberLimit(maxCommentPageNumberLimit + pageNumberLimit);
            setMinCommentPageNumberLimit(minCommentPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevCommentBtn = () => {
        setCurrentCommentPage(currentCommentPage - 1);
        if ((currentCommentPage - 1) % pageNumberLimit === 0) {
            setMaxCommentPageNumberLimit(maxCommentPageNumberLimit - pageNumberLimit);
            setMinCommentPageNumberLimit(minCommentPageNumberLimit - pageNumberLimit);
        }
    };

    const indexOfLastPost = currentPostPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const indexOfLastComment = currentCommentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const postPages = []; //게시글
    for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
        postPages.push(i);
    }

    const commentPages = []; //댓글
    for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
        commentPages.push(i);
    }

    const renderPostPageNumbers = postPages.map((number) => {
        if (number < maxPostPageNumberLimit + 1 && number > minPostPageNumberLimit) {
            return (
                <Pagination.Item key={number} active={number === currentPostPage} onClick={() => paginatePosts(number)}>
                    {number}
                </Pagination.Item>
            );
        } else {
            return null;
        }
    });

    const renderCommentPageNumbers = commentPages.map((number) => {
        if (number < maxCommentPageNumberLimit + 1 && number > minCommentPageNumberLimit) {
            return (
                <Pagination.Item key={number} active={number === currentCommentPage} onClick={() => paginateComments(number)}>
                    {number}
                </Pagination.Item>
            );
        } else {
            return null;
        }
    });

    return (
        <Container style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1>{username}'s Profile</h1>
            <Tabs defaultActiveKey="posts">
                <Tab eventKey="posts" title="게시글">
                    <PostList posts={currentPosts} onSelectPost={() => {}} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Pagination className="mt-4">
                            <Pagination.Prev onClick={handlePrevPostBtn} disabled={currentPostPage === 1} />
                            {renderPostPageNumbers}
                            <Pagination.Next onClick={handleNextPostBtn} disabled={currentPostPage === postPages[postPages.length - 1]} />
                        </Pagination>
                    </div>
                </Tab>
                <Tab eventKey="comments" title="댓글">
                    <CommentList comments={currentComments} setComments={setComments} disableActions={true}/>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Pagination className="mt-4">
                            <Pagination.Prev onClick={handlePrevCommentBtn} disabled={currentCommentPage === 1} />
                            {renderCommentPageNumbers}
                            <Pagination.Next onClick={handleNextCommentBtn} disabled={currentCommentPage === commentPages[commentPages.length - 1]} />
                        </Pagination>
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default SectionUserProfile;