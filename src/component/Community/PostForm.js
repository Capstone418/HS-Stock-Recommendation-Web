import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const PostForm = ({ onCreatePost, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); //이미지 미리보기
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content) {
            setErrorMessage('제목과 내용을 모두 입력해주세요.');
            return;
        }

        if (title.length > 30) {
            setErrorMessage('제목은 30자 이하여야 합니다.');
            return;
        }

        const username = localStorage.getItem("username");

        if (image) {
            // Convert image to Base64
            const reader = new FileReader();
            reader.onload = (event) => {
                onCreatePost({ title, content, username, image: event.target.result }); // Pass Base64 encoded image to onCreatePost
                clearForm();
            };
            reader.readAsDataURL(image);
        } else {
            onCreatePost({ title, content, username });
            clearForm();
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

    const clearForm = () => {
        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setErrorMessage(''); //폼 초기화
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Form onSubmit={handleSubmit}>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group>
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>이미지 첨부</Form.Label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} />}
                </Form.Group>

                <Button variant="primary" type="submit">저장</Button>
                <Button variant="secondary" onClick={onCancel}>취소</Button>
            </Form>
        </div>
    );
};

export default PostForm;