import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import { Container, Button, Pagination } from 'react-bootstrap';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';

const SectionCommunity = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreatingPost, setIsCreatingPost] = useState(false); //게시물 작성 모드인지 여부를 나타내는 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); //검색어를 담고 있는 상태
    const postsPerPage = 10;
    const pageNumberLimit = 10;
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/community/posts');
            setPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSelectPost = async (post) => { //특정 게시물을 선택했을 때 해당 게시물의 상세 정보를 가져와 selectedPost 상태를 업데이트
        try {
            const response = await axios.get(`/api/community/posts/${post.id}`);
            setSelectedPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleCreatePost = async (post) => {
        try {
            const response = await axios.post('/api/community/posts', post);
            setPosts([response.data, ...posts]);
            setIsCreatingPost(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const username = localStorage.getItem("username");
            await axios.delete(`/api/community/posts/${postId}`, { params: { username } });
            setPosts(posts.filter((post) => post.id !== postId));
            setSelectedPost(null);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleBackToPosts = () => { //게시물 상세 보기나 작성 모드에서 게시물 목록 보기로 돌아감
        setSelectedPost(null);
        setIsCreatingPost(false);
        fetchPosts(); // 목록으로 돌아갈 때 글 목록을 다시 로드
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const pages = [];
    for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
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

    const renderContent = () => {
        if (selectedPost) {
            return <PostDetail post={selectedPost} onBack={handleBackToPosts} onDelete={handleDeletePost} />;
        } else if (isCreatingPost) {
            return <PostForm onCreatePost={handleCreatePost} onCancel={handleBackToPosts} />;
        } else {
            return (
                <>
                    <Button variant="success" onClick={() => setIsCreatingPost(true)} className="mb-4">
                        <FaPlus /> 게시글 작성
                    </Button>
                    <PostList posts={currentPosts} onSelectPost={handleSelectPost} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Pagination className="mt-4">
                            <Pagination.Prev onClick={handlePrevbtn} disabled={currentPage === 1} />
                            {renderPageNumbers}
                            <Pagination.Next onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1]} />
                        </Pagination>
                    </div>
                </>
            );
        }
    };

    return (
        <Container className="mt-5 p-4">
            <h1 className="my-4 text-center" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2rem' }}>
                자유게시판
            </h1>
            {selectedPost ? (
                <Button variant="secondary" onClick={handleBackToPosts} className="mb-4">
                    <FaArrowLeft /> 뒤로 가기
                </Button>
            ) : null}
            {renderContent()}
        </Container>
    );
};

export default SectionCommunity;