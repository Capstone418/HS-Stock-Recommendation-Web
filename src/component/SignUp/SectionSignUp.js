import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function SectionSignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username.length < 8) {
            setError('사용자 이름은 8자 이상이어야 합니다.');
            return;
        }

        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
            setError('비밀번호는 영어와 숫자를 포함하여 8자 이상이어야 합니다.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        if (!validateEmail(email)) {
            setError('올바른 이메일 형식이 아닙니다.');
            return;
        }

        try {
            const response = await axios.post('/auth/signup', {
                username,
                password,
                nickname,
                email
            });

            if (response.status === 200) {
                console.log('회원가입 성공:', response.data);
                alert("회원가입 성공! 메인 페이지로 돌아갑니다. 필요 시 로그인해주세요.");
                document.location.href = '/';
            }
        } catch (error) {
            if  ( error.response.status === 401) {
                console.error('회원가입 실패:', error.response.statusText);
                setError('중복된 아이디입니다');
            } else if  ( error.response.status === 409) {
                console.error('회원가입 실패:', error.response.statusText);
                setError('중복된 이메일입니다');
            }
            else {
                console.error('네트워크 오류:', error);
                setError('네트워크 오류가 발생했습니다.');
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-70" style={{marginTop:"100px"}}>
            <div className="text-center w-50">
                <h2>회원가입</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formId">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formNickname">
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required

                        />

                    </Form.Group>
                    {error  && <Alert variant="danger">{error}</Alert>}
                    <Button variant="primary" type="submit">
                        회원가입
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default SectionSignUp;