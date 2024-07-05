import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Tab, Tabs, Form, Button, Pagination, Spinner } from 'react-bootstrap';
import PostList from '../Community/PostList';
import CommentList from '../Community/CommentList';

const SectionMyPage = () => {
    const username = localStorage.getItem("username");
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [currentPostPage, setCurrentPostPage] = useState(1);
    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [userInfo, setUserInfo] = useState({ username: '', nickname: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    const [editMode, setEditMode] = useState(false); //편집
    const [passwordEditMode, setPasswordEditMode] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
    const [postPageGroup, setPostPageGroup] = useState(0); //페이지 그룹(10)
    const [commentPageGroup, setCommentPageGroup] = useState(0);
    const [postSearchTerm, setPostSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); //로딩상태
    const postsPerPage = 5;
    const commentsPerPage = 5;
    const pagesPerGroup = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await fetchUserPosts();
            await fetchUserComments();
            await fetchUserInfo();
            setLoading(false);
        };
        fetchData();
    }, [username]);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`/api/community/posts/user/${username}`);
            setUserPosts(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    const fetchUserComments = async () => {
        try {
            const response = await axios.get(`/api/community/comments/user/${username}`);
            setUserComments(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error('Error fetching user comments:', error);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`/api/mypage/${username}`);
            setUserInfo({ ...response.data, currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    const handleUpdateInfo = async () => {
        const isEmailValid = validateEmail(userInfo.email);
        setEmailValid(isEmailValid);

        if (isEmailValid) {
            try {
                const { currentPassword, newPassword, confirmPassword, ...updateData } = userInfo;
                const response = await axios.put(`/api/mypage/${username}`, updateData);
                setUserInfo(response.data);
                setEditMode(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setEmailValid(false);
                }
                console.error('Error updating user info:', error);
            }
        }
    };

    const handleUpdatePassword = async () => { //비밀번호 변경, 비밀번호 확인 후 새 비밀번호 설정
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = userInfo.newPassword === userInfo.confirmPassword;
        const isCurrentPasswordValid = validateCurrentPassword();

        setPasswordValid(isPasswordValid);
        setConfirmPasswordValid(isConfirmPasswordValid);
        setCurrentPasswordValid(isCurrentPasswordValid);

        if (isPasswordValid && isConfirmPasswordValid && isCurrentPasswordValid) {
            try {
                const passwordUpdateResponse = await axios.put(`/api/mypage/${username}/password`, { currentPassword: userInfo.currentPassword, newPassword: userInfo.newPassword });
                if (passwordUpdateResponse.status === 400) {
                    setPasswordValid(false);
                    return;
                }
                setUserInfo({ ...userInfo, currentPassword: '', newPassword: '', confirmPassword: '' });
                setPasswordEditMode(false);
            } catch (error) {
                console.error('Error updating password:', error);
                setCurrentPasswordValid(false);
            }
        }
    };

    const validateEmail = (email) => { //이메일 유효성 검사
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = () => {
        if (!userInfo.newPassword) {
            return false;
        }
        return userInfo.newPassword.length >= 8 && /[A-Za-z]/.test(userInfo.newPassword) && /[0-9]/.test(userInfo.newPassword);
    };

    const validateCurrentPassword = () => {
        if (!userInfo.currentPassword) {
            return false;
        }
        return userInfo.currentPassword.length > 0;
    };

    const paginatePosts = (pageNumber) => setCurrentPostPage(pageNumber);
    const paginateComments = (pageNumber) => setCurrentCommentPage(pageNumber);

    const indexOfLastPost = currentPostPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const filteredPosts = userPosts.filter(post =>
        post.title.toLowerCase().includes(postSearchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(postSearchTerm.toLowerCase())
    );
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const indexOfLastComment = currentCommentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = userComments.slice(indexOfFirstComment, indexOfLastComment);

    const totalPostPages = Math.ceil(filteredPosts.length / postsPerPage);
    const totalCommentPages = Math.ceil(userComments.length / commentsPerPage);

    const postPageNumbers = [];
    for (let i = 1; i <= totalPostPages; i++) {
        postPageNumbers.push(i);
    }

    const commentPageNumbers = [];
    for (let i = 1; i <= totalCommentPages; i++) {
        commentPageNumbers.push(i);
    }

    if (loading) {
        return <Spinner animation="border" />; //로딩상태 표시하는 스피너
    }

    return (
        <Container style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h1>{username}'s Profile</h1>
            <Tabs defaultActiveKey="posts">
                <Tab eventKey="info" title="사용자 정보">
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                                value={userInfo.username}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="formNickname">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control
                                type="text"
                                value={userInfo.nickname}
                                readOnly={!editMode}
                                onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                value={userInfo.email}
                                readOnly={!editMode}
                                isInvalid={!emailValid}
                                onChange={(e) => {
                                    setUserInfo({ ...userInfo, email: e.target.value });
                                    setEmailValid(true);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                중복되거나 올바른 형식이 아닌 이메일입니다
                            </Form.Control.Feedback>
                        </Form.Group>
                        {editMode ? (
                            <Button variant="primary" onClick={handleUpdateInfo}>정보 수정</Button>
                        ) : (
                            <Button variant="secondary" onClick={() => setEditMode(true)}>정보 편집</Button>
                        )}
                    </Form>
                    <div className="mb-3"></div>
                    {passwordEditMode ? (
                        <>
                            <Form.Group controlId="formCurrentPassword">
                                <Form.Label>현재 비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={userInfo.currentPassword}
                                    isInvalid={!currentPasswordValid}
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, currentPassword: e.target.value });
                                        setCurrentPasswordValid(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    현재 비밀번호가 올바르지 않습니다.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>새 비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={userInfo.newPassword}
                                    isInvalid={!passwordValid}
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, newPassword: e.target.value });
                                        setPasswordValid(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호는 영어와 숫자를 포함하여 최소 8자 이상이어야 합니다.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>비밀번호 확인</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={userInfo.confirmPassword}
                                    isInvalid={!confirmPasswordValid}
                                    onChange={(e) => {
                                        setUserInfo({ ...userInfo, confirmPassword: e.target.value });
                                        setConfirmPasswordValid(true);
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호가 일치하지 않습니다.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" onClick={handleUpdatePassword}>비밀번호 수정</Button>
                            <Button variant="secondary" onClick={() => setPasswordEditMode(false)}>취소</Button>
                        </>
                    ) : (
                        <Button variant="secondary" onClick={() => setPasswordEditMode(true)}>비밀번호 변경</Button>
                    )}
                </Tab>
                <Tab eventKey="posts" title="게시글">
                    <PostList posts={currentPosts} onSelectPost={() => {}} searchTerm={postSearchTerm} setSearchTerm={setPostSearchTerm} disableActions={true} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Pagination className="mt-4">
                            {postPageGroup > 0 && (
                                <Pagination.Prev onClick={() => setPostPageGroup(postPageGroup - 1)} />
                            )}
                            {postPageNumbers.slice(postPageGroup * pagesPerGroup, (postPageGroup + 1) * pagesPerGroup).map(number => (
                                <Pagination.Item key={number} active={number === currentPostPage}
                                                 onClick={() => paginatePosts(number)}>
                                    {number}
                                </Pagination.Item>
                            ))}
                            {(postPageGroup + 1) * pagesPerGroup < totalPostPages && (
                                <Pagination.Next onClick={() => setPostPageGroup(postPageGroup + 1)} />
                            )}
                        </Pagination>
                    </div>
                </Tab>
                <Tab eventKey="comments" title="댓글">
                    <CommentList comments={currentComments} setComments={setUserComments} disableActions={true} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Pagination className="mt-4">
                            {commentPageGroup > 0 && (
                                <Pagination.Prev onClick={() => setCommentPageGroup(commentPageGroup - 1)} />
                            )}
                            {commentPageNumbers.slice(commentPageGroup * pagesPerGroup, (commentPageGroup + 1) * pagesPerGroup).map(number => (
                                <Pagination.Item key={number} active={number === currentCommentPage}
                                                 onClick={() => paginateComments(number)}>
                                    {number}
                                </Pagination.Item>
                            ))}
                            {(commentPageGroup + 1) * pagesPerGroup < totalCommentPages && (
                                <Pagination.Next onClick={() => setCommentPageGroup(commentPageGroup + 1)} />
                            )}
                        </Pagination>
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default SectionMyPage;