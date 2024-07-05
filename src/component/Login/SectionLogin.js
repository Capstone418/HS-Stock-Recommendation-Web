import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';

function SectionLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [findIdEmail, setFindIdEmail] = useState(''); //아이디 찾을 이메일
    const [foundId, setFoundId] = useState(''); //아이디 찾기
    const [findIdError, setFindIdError] = useState('');

    const [showFindPwModal, setShowFindPwModal] = useState(false); //비밀번호 찾기 모달
    const [findPwUsername, setFindPwUsername] = useState(''); //비밀번호 찾을 username
    const [findPwEmail, setFindPwEmail] = useState(''); //비밀번호 찾을 이메일
    const [verificationCode, setVerificationCode] = useState(''); //인증코드
    const [newPassword, setNewPassword] = useState('');
    const [findPwError, setFindPwError] = useState('');
    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/auth/login', { username, password });

            if (response.status === 200) {
                const { accessToken, refreshToken, accessTokenExpiresIn } = response.data;
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('accessTokenExpiresIn', accessTokenExpiresIn);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('login', "1");
                localStorage.setItem('username', username);
                document.location.href = '/';
            }
        } catch (error) {
            if  ( error.response.status === 401) {
                console.error('로그인 실패:', error.response.statusText);
                setError('로그인에 실패했습니다. 다시 시도해주세요.');
            }  else {
                console.error('네트워크 오류:', error);
                setError('네트워크 오류가 발생했습니다.');
            }

        } finally {
            setLoading(false);
        }
    };

    const handleFindId = async () => {
        if (!findIdEmail) {
            setFindIdError('이메일을 입력해주세요.');
            return;
        }

        setLoading(true);
        setFindIdError('');
        setFoundId('');

        try {
            const response = await axios.get('/auth/find-username', { params: { email: findIdEmail } });
            if (response.status === 200) {
                setFoundId(response.data);
            }
        } catch (error) {
            setFindIdError('아이디 찾기에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleFindPw = async () => {
        if (!findPwUsername || !findPwEmail) {
            setFindPwError('아이디와 이메일을 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        setFindPwError('');

        try {
            const response = await axios.post('/auth/initiate-password-reset', {
                username: findPwUsername,
                email: findPwEmail
            });
            if (response.status === 200) {
                setShowResetPassword(true);
            }
        } catch (error) {
            setFindPwError('비밀번호 찾기에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!verificationCode || !newPassword) {
            setFindPwError('인증번호와 새 비밀번호를 모두 입력해주세요.');
            return;
        }

        if (!validatePassword(newPassword)) {
            setFindPwError('비밀번호는 영어와 숫자를 포함하여 8자 이상이어야 합니다.');
            return;
        }

        setLoading(true);
        setFindPwError('');

        try {
            await axios.post('/auth/reset-password', {
                username: findPwUsername,
                verificationCode: verificationCode,
                newPassword: newPassword
            });
            setSuccess('비밀번호가 성공적으로 재설정되었습니다.');
            handleCloseModal();
        } catch (error) {
            setFindPwError('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    };

    const handleCloseModal = () => {
        setShowFindIdModal(false);
        setShowFindPwModal(false);
        setFindIdEmail('');
        setFoundId('');
        setFindIdError('');
        setFindPwUsername('');
        setFindPwEmail('');
        setVerificationCode('');
        setNewPassword('');
        setFindPwError('');
        setShowResetPassword(false);
        setSuccess('');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-70" style={{ marginTop: "100px" }}>
            <div className="text-center w-50">
                <h1><img alt="" src="finance_logo.png" width="40" height="40" className="d-inline-block align" />{' '}Finance</h1>
                <Form className={"login-form"} onSubmit={handleLogin}>
                    <Form.Group controlId="formId">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                        로그인
                    </Button>
                    <div className="mt-3">
                        <Button variant="link" onClick={() => setShowFindIdModal(true)}>
                            아이디 찾기
                        </Button>
                        <Button variant="link" onClick={() => setShowFindPwModal(true)}>
                            비밀번호 찾기
                        </Button>
                    </div>
                </Form>
            </div>

            {/* Find ID Modal */}
            <Modal show={showFindIdModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>아이디 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFindIdEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={findIdEmail}
                                onChange={(e) => setFindIdEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {foundId && <Alert variant="success">찾은 아이디: {foundId}</Alert>}
                        {findIdError && <Alert variant="danger">{findIdError}</Alert>}
                        <Button variant="primary" onClick={handleFindId} className="mt-3" disabled={loading}>
                            아이디 찾기
                        </Button>
                        {loading && <Spinner animation="border" />}
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Find Password Modal */}
            <Modal show={showFindPwModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>비밀번호 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!showResetPassword ? (
                        <Form>
                            <Form.Group controlId="formFindPwUsername">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="아이디를 입력하세요"
                                    value={findPwUsername}
                                    onChange={(e) => setFindPwUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formFindPwEmail">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="이메일을 입력하세요"
                                    value={findPwEmail}
                                    onChange={(e) => setFindPwEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {findPwError && <Alert variant="danger">{findPwError}</Alert>}
                            <Button variant="primary" onClick={handleFindPw} className="mt-3" disabled={loading}>
                                비밀번호 찾기
                            </Button>
                            {loading && <Spinner animation="border" />}
                        </Form>
                    ) : (
                        <Form>
                            <Form.Group controlId="formVerificationCode">
                                <Form.Label>인증번호</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="이메일로 받은 인증번호를 입력하세요(인증번호 5분 유효)"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>새 비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="새 비밀번호를 입력하세요"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {findPwError && <Alert variant="danger">{findPwError}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Button variant="primary" onClick={handleResetPassword} className="mt-3" disabled={loading}>
                                비밀번호 재설정
                            </Button>
                            {loading && <Spinner animation="border" />}
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default SectionLogin;