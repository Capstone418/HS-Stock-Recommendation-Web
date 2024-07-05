import React, { useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CommentList = ({ comments, disableActions, setComments, onDelete, canModifyComment }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');

    const handleEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
    };

    const handleUpdateComment = async (commentId) => {
        try {
            if (!editContent.trim()) {
                return;
            }
            const username = localStorage.getItem("username");
            await axios.put(`/api/community/comments/${commentId}`, {
                content: editContent
            }, { params: { username } });

            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId ? { ...comment, content: editContent } : comment
                )
            );

            setEditingCommentId(null);
            setEditContent('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleKeyPress = (e, commentId) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUpdateComment(commentId);
        }
    };

    const formatDate = (dateString) => { //날짜 포맷
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <ListGroup style={{ textAlign: 'left' }}>
            {comments.map((comment) => (
                <ListGroup.Item key={comment.id} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {editingCommentId === comment.id ? (
                        <Form>
                            <Form.Group controlId="editContent">
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, comment.id)}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleUpdateComment(comment.id)}
                            >
                                저장
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setEditingCommentId(null)}
                            >
                                취소
                            </Button>
                        </Form>
                    ) : (
                        <>
                            <p><img alt="" src="/user_64.png"
                                    width="35" height="35"/> {comment.username}</p>
                            <p>{comment.content}</p>
                            <p>{formatDate(comment.createdAt)}</p>
                            {!disableActions && canModifyComment(comment.username) && (
                                <>
                                    <Button variant="link" size="sm" onClick={() => handleEdit(comment)}>수정</Button>
                                    <Button variant="danger" size="sm" onClick={() => onDelete(comment.id)}>삭제</Button>
                                </>
                            )}
                        </>
                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default CommentList;