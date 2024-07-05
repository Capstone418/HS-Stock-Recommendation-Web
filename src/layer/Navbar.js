import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge'
import React from "react";
import {ButtonGroup} from "reactstrap";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

function NavBar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        checkLoginStatus(); // 로그인 상태를 체크하여 state 업데이트
        fetchAccessToken();
        getUsername(); // 유저네임 가져오기
    }, []);

    const checkLoginStatus = () => {
        try {
            const login = localStorage.getItem("login");
            const accessToken = localStorage.getItem("accessToken");
            if (login === "1") {
                setIsLoggedIn(true); // "login"이 "1"이면 로그인 상태로 설정
                axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
            }
        } catch (error) {
            console.error("네트워크 오류:", error);
        }
    };

    const getUsername = () => {
        try {
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) {
                setUsername(storedUsername);
            }
        } catch (error) {
            console.error("네트워크 오류:", error);
        }
    };

    const handleLogout = async() => {
        try{ const accessToken = localStorage.getItem("accessToken");
            const response = await axios.post('/auth/logout', {accessToken});
            if (response.status === 200) {



                setIsLoggedIn(false);
                localStorage.setItem('login', "0");
                localStorage.removeItem('username'); // 유저네임 삭제
                localStorage.removeItem('accessToken');
                localStorage.removeItem('accessTokenExpiresIn');
                localStorage.removeItem('refreshToken');
                // expireCookie('refreshToken');
                delete axios.defaults.headers.common["Authorization"];
                document.location.href = '/';
            }
        }catch(error){
            console.error('네트워크 오류:', error);

        }
    };

    const handleChatgpt = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            //alert("555: "+accessToken);
            if (!accessToken) {
                delete axios.defaults.headers.common["Authorization"];
            }
            const response = await axios.post('/auth/page', {

            });

            if (response.status === 200) {
                document.location.href = '/chatbot';
            }
        } catch (error) {
            if  (error.response.status === 401) {
                alert("회원만 접속하실 수 있습니다. 로그인을 해주세요.");
                handleLogout();
                document.location.href = '/login';
            }
            else {
                console.error('네트워크 오류:', error);

            }

        }
    };
    const handleCommunity = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            //alert("555: "+accessToken);
            if (!accessToken) {
                delete axios.defaults.headers.common["Authorization"];
            }
            const response = await axios.post('/auth/page', {

            });

            if (response.status === 200) {
                document.location.href = '/community';
            }
        } catch (error) {
            if  (error.response.status === 401) {
                alert("회원만 접속하실 수 있습니다. 로그인을 해주세요.");
                handleLogout();
                document.location.href = '/login';
            }
            else {
                console.error('네트워크 오류:', error);

            }

        }
    };
    const fetchAccessToken = async () => { //페이지 로드시에 accesstoken 만료를 확인하기 위한 함수 모든 페이지에 있는 navbar에 작성함
        try {
            const rToken =  localStorage.getItem('refreshToken');
            const aToken =  localStorage.getItem('accessToken');
            //    const refreshToken=getCookie('refreshtoken');
            //   const Token = localStorage.getItem('accessToken');
            if (!rToken) return;
            const accessTokenExpiration = localStorage.getItem('accessTokenExpiresIn');

            if (accessTokenExpiration && (accessTokenExpiration - Date.now()) < 30000) {

                const response = await axios.post('/auth/reissue', {refreshToken:rToken, accessToken:aToken}
                );

                if (response.status === 200) {
                    const { accessToken, accessTokenExpiresIn,refreshToken } = response.data;
                    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('accessTokenExpiresIn', accessTokenExpiresIn);
                    console.log('갱신 성공');
                }
            }
        } catch (error) {
            if  (error.response.status === 401) {
                handleLogout();
                document.location.href = '/login';
            }
            else {
                console.error('네트워크 오류:', error);

            }
        }
    };

    return (
        <div id="Navigation" style={{width:"100%", background:"#212529",
            position: "fixed", zIndex: "100" }}>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark" style={{marginLeft:"100px"}}>
                <Container fluid style={{marginLeft: "0px"}}>
                    <Navbar.Brand href="/">
                        <img alt="" src="/finance_logo.png"
                             width="30" height="30"
                             className="d-inline-block align-top"
                             style={{border:"1px solid white", borderRadius:"8px"}}
                        />{' '}
                        Finance
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px'}}
                            navbarScroll
                        >
                            <Nav.Link href="/recommend">종목추천</Nav.Link>
                            <Nav.Link href="/price-menu">주가메뉴</Nav.Link>

                            <Nav.Link onClick={handleChatgpt}>
                                챗봇AI&nbsp;
                                <sup><Badge bg={"light"} text={"dark"}>Beta</Badge></sup>
                            </Nav.Link>
                            <Nav.Link  onClick={handleCommunity}>커뮤니티</Nav.Link>
                        </Nav>
                        <ButtonGroup style={{ marginRight: "100px" }}>
                            {isLoggedIn ? (
                                <>
                                    <span style={{ color: "white", marginRight: "20px" ,lineHeight: "2.5"}}>안녕하세요, {username}</span>
                                    <Button variant={"outline-light"} href={"/mypage"}>
                                      마이페이지
                                    </Button>
                                    <Button variant={"outline-light"} onClick={handleLogout}>
                                        로그아웃
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant={"outline-light"} href={"/login"}>
                                        로그인
                                    </Button>
                                    <Button variant={"outline-light"} href={"/signup"}>
                                        회원가입
                                    </Button>
                                </>
                            )}
                        </ButtonGroup>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;