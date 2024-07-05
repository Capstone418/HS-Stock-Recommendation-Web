import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CommentForm = ({ onCreateComment }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = localStorage.getItem("username");
        onCreateComment({ content, username });
        setContent('');
    };

    const handleKeyPress = (e) => { //엔터키 입력하면 제출
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </Form.Group>
            <Button variant="primary" type="submit">댓글 작성</Button>
        </Form>
    );
};

export default CommentForm;