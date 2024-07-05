import React, { useState, useEffect } from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PostList = ({ posts, onSelectPost, searchTerm, setSearchTerm }) => {
    const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
        filterPosts(searchTerm || '');
    }, [posts, searchTerm]);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    const filterPosts = (term) => {
        if (!term.trim()) {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(term.toLowerCase()) ||
                post.content.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ListGroup>
                {filteredPosts.map((post) => (
                    <ListGroup.Item action key={post.id} onClick={() => onSelectPost && onSelectPost(post)}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1">{post.title}</h5>
                            </div>
                            <div className="text-right" style={{ minWidth: '200px' }}>
                                <small>
                                    <Link to={`/user/${post.username}`} onClick={(e) => e.stopPropagation()}>
                                        {post.username}
                                    </Link>
                                    {' '}
                                    <img alt="" src="/chat.png" width="15" height="15" />
                                    {' '}
                                    {post.comments ? post.comments.length : 0}
                                    {' '}
                                    <img alt="" src="/like.png" width="15" height="15" />
                                    {' '}
                                    {post.likeCount}
                                </small>
                                <br />
                                <small className="text-muted">{new Date(post.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Form.Group controlId="searchPosts" className="mt-3" style={{ width: '60%', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
                <Form.Control
                    type="text"
                    placeholder="게시글 제목 및 내용 검색"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ flexGrow: 1 }}
                />
                <img alt="" src="/search.png" width="30" height="30" />
            </Form.Group>
        </div>
    );
};

export default PostList;