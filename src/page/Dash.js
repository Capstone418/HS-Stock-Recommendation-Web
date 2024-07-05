import React from "react";
import GlobalStyle from "../GlobalStyle";
import NavBar from "../layer/Navbar";
import Card from "react-bootstrap/Card";
import Footer from "../layer/Footer";
import {MDBCol, MDBContainer,MDBRow,MDBCard} from "mdb-react-ui-kit";
import ScrollToTopButton from "../layer/ScrollToTopButton";
import Badge from 'react-bootstrap/Badge'
import axios from "axios";

function Dash(props) {
    const handleChatgpt = async() => {
        try {
            const accessToken = localStorage.getItem('accessToken');

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
    const handleLogout = () => {
        localStorage.setItem('login', "0");
        localStorage.removeItem('username'); // 유저네임 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenExpiresIn');
        localStorage.removeItem('refreshToken');
        // expireCookie('refreshToken');
        delete axios.defaults.headers.common["Authorization"];

    };

    return (
        <>
            <GlobalStyle/>
            <ScrollToTopButton />
            <NavBar />
            <div style={{position: "relative", width: "100%"}}>
                <img
                    src={"https://images.unsplash.com/photo-1529678407585-55ac0053aa47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NjI0M3wwfDF8c2VhcmNofDJ8fG1vZGVybnxlbnwwfHx8fDE3MTI4MzA3MzJ8MA&ixlib=rb-4.0.3&q=80&w=1080"}
                    alt={""} width={"100%"} height={"450px"} style={{objectFit: "cover"}}/>
                <div style={{
                    position: "absolute",
                    top: "250px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Card style={{width: "100%", height: "400px", position: "relative",
                        boxShadow: "10px 10px 8px rgba(0, 0, 0, 0.1)"}}>
                        <div style={{
                            width: "100%",
                            height: "50%",
                            background: "linear-gradient(180deg, #CCCCCC, white)",
                            position: "absolute",
                            top: 0,
                            left: 0
                        }}>
                            <div style={{textAlign:"center",fontFamily: "Arial, sans-serif",
                            marginTop:"60px"}}>
                                <h1 style={{color:"rgb(87 85 85)"}}>
                                    <strong>최고의 주식 어시스턴트를 경험해보세요!</strong>
                                </h1>
                                <div>
                                    <h2 style={{color:"rgb(100 98 98)", marginTop:"40px"}}>
                                        <strong>주식종목 추천 사이트</strong>
                                    </h2>
                                </div>
                                <div style={{
                                    width: "100%", marginTop: "40px", marginBottom: "10px",
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    <hr style={{width: "60%", borderTop: "1px solid #999999"}}/>
                                </div>
                                <div style={{
                                    width: "100%",
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                    <MDBRow className={"mb-4"}>
                                        <MDBCol>
                                            <MDBCard floating
                                                    className={'m-1'}
                                                    style={{background:"white", borderRadius:"50px", paddingTop:"10px",
                                                        paddingBottom:"10px", paddingLeft:"17px", border:"2px solid black",
                                                        transition: "background 0.3s"}}
                                                     onClick={() => {window.location.href = 'http://localhost:3000/recommend'}}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background="gray";}}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background="white";}}>
                                                <img alt={""} src={"home.png"} width={"30"} height={"30"} />
                                            </MDBCard>
                                            <p><strong>종목추천</strong></p>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBCard floating
                                                    className={'m-1'}
                                                     style={{background:"white", borderRadius:"50px", paddingTop:"10px",
                                                         paddingBottom:"10px", paddingLeft:"17px", border:"2px solid black",
                                                         transition: "background 0.3s"}}
                                                     onClick={() => {window.location.href = 'http://localhost:3000/price-menu'}}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background="gray";}}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background="white";}}>
                                                <img alt={""} src={"home.png"} width={"30"} height={"30"} />
                                            </MDBCard>
                                            <p><strong>주가메뉴</strong></p>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBCard floating
                                                    className={'m-1'}
                                                     style={{background:"white", borderRadius:"50px", paddingTop:"10px",
                                                         paddingBottom:"10px", paddingLeft:"17px", border:"2px solid black",
                                                         transition: "background 0.3s"}}
                                                     onClick={handleChatgpt}
                                                    onMouseEnter={(e) => { e.currentTarget.style.background="gray";}}
                                                    onMouseLeave={(e) => { e.currentTarget.style.background="white";}}>
                                                <img alt={""} src={"home.png"} width={"30"} height={"30"} />
                                            </MDBCard>
                                            <p><strong>
                                                챗봇AI&nbsp;<Badge bg={"danger"}>Beta</Badge>
                                            </strong></p>
                                        </MDBCol>
                                        <MDBCol>
                                            <MDBCard floating
                                                     className={'m-1'}
                                                     style={{background:"white", borderRadius:"50px", paddingTop:"10px",
                                                         paddingBottom:"10px", paddingLeft:"17px", border:"2px solid black",
                                                         transition: "background 0.3s"}}
                                                     onClick={handleCommunity}
                                                     onMouseEnter={(e) => { e.currentTarget.style.background="gray";}}
                                                     onMouseLeave={(e) => { e.currentTarget.style.background="white";}}>
                                                <img alt={""} src={"home.png"} width={"30"} height={"30"} />
                                            </MDBCard>
                                            <p><strong>
                                               커뮤니티
                                            </strong></p>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div style={{width:"100%", marginTop:"350px", marginBottom:"100px",
                display: "flex",justifyContent: "center",alignItems:"center"}}>
                <div style={{width:"70%", textAlign:"center", fontFamily: "Arial, sans-serif"}}>
                    <h2>
                        <strong>타사 정보 사이트와 다른 점은 무엇인가?</strong></h2>
                    <p className={"text-muted"} style={{marginTop:"30px"}}>
                        AI를 활용한 기능들과 Chatgpt 분석 및 TradingVeiw API를 통한 고급 차트그래프, 기술 지표 분석 툴을 제공합니다.
                        <br/>이에 필요한 데이터는 Naver API와 Creon API를 이용하였습니다.
                    </p>
                    <MDBContainer style={{marginTop:"40px"}}>
                            <MDBRow className={"mb-4"}>
                                <MDBCol size={"md"}>
                                    <img alt="" src={"checkbox.png"} width={"20"} height={"20"}/>
                                    &nbsp;&nbsp;
                                    <strong>딥러닝</strong>
                                    <p className={"text-muted"} style={{ paddingLeft: "25px", marginTop:"10px"}}>
                                        <ul style={{textAlign:"left"}}>
                                            <li>정책경사를 적용한 DQN 신경망을 통해 특징을 자동 학습합니다.</li>
                                            <li>각 종목의 일별 차트 데이터와 이동평균선을 학습데이터로 사용하며, 학습 알고리즘은 강화학습을 사용하였습니다.</li>
                                            <li>학습 결과로 자산 포트폴리오 가치가 높은 5개의 종목을 추천 대상으로 사용자에게 제공합니다.</li>
                                            <li>사용자들의 실전 투자에 대한 책임은 저희에게 없음을 밝힙니다.</li>
                                            <li>해당 사이트는 정보 제공성을 목적으로 하며, 보조 수단의 책임을 수행합니다.</li>
                                        </ul>
                                    </p>
                                </MDBCol>
                                <MDBCol size={"md"}>
                                    <img alt="" src={"checkbox.png"} width={"20"} height={"20"}/>
                                    &nbsp;&nbsp;
                                    <strong>ChatGPT</strong>
                                    <p className={"text-muted"} style={{paddingLeft: "25px", marginTop: "10px"}}>
                                        <ul style={{textAlign:"left"}}>
                                            <li>추천 종목 5개의 각 일별 차트 및 뉴스 데이터를 활용합니다.</li>
                                            <li>데이터들의 상관관계 분석을 통해 주가동향, 최근뉴스의분위기, 주요키워드5개를 사용자에게 제공합니다.</li>
                                            <li>시가총액 상위 28개의 상장기업들의 최신 뉴스들도 주가동향, 뉴스분위기, 주요키워드를 제공합니다.</li>
                                            <li>각 종목의 뉴스마다 AI가 분석한 핵심 요약 내용, 인사이트 3가지를 제공합니다.</li>
                                            <li>분석 방식에는 Chatgpt를 이용하였습니다.</li>
                                        </ul>
                                    </p>
                                </MDBCol>
                                <MDBCol size={"md"}>
                                    <img alt="" src={"checkbox.png"} width={"20"} height={"20"}/>
                                    &nbsp;&nbsp;
                                    <strong>기술 분석</strong>
                                    <p className={"text-muted"} style={{paddingLeft: "25px", marginTop: "10px"}}>
                                        TradingView API를 통해 다음의 분석 도구를 제공합니다.
                                        <br/>
                                        <br/>
                                        <ul style={{textAlign:"left"}}>
                                            <li>고급 차트그래프</li>
                                            <li>업종별 히트맵</li>
                                            <li>주가 급상승 테이블</li>
                                            <li>거래량 급상승 테이블</li>
                                            <li>매매 추세 분석</li>
                                        </ul>
                                    </p>
                                </MDBCol>
                                <MDBCol size={"md"}>
                                    <img alt="" src={"checkbox.png"} width={"20"} height={"20"}/>
                                    &nbsp;&nbsp;
                                    <strong>챗봇AI</strong>
                                    <p className={"text-muted"} style={{paddingLeft: "25px", marginTop: "10px"}}>
                                        <ul style={{textAlign:"left"}}>
                                            <li>사용자는 챗봇AI 페이지를 통해 ChatAI와 소통이 가능합니다.</li>
                                            <li>실제 Chatgpt가 답변하지 못하는 주식정보, 주식분석에 관한 질문이 가능합니다.</li>
                                            <li>질문 맞춤형 데이터들을 자사 DB에 저장된 정보들을 통해 동적으로 메시지를 작성하여, 기존 Chatgpt에게 물어보지 못하는 질문에 대한 답변이 가능합니다.</li>
                                            <li>텍스트 분석은 Chatgpt를 통해 구현되었음을 밝힙니다.</li>
                                        </ul>
                                    </p>
                                </MDBCol>
                            </MDBRow>
                    </MDBContainer>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Dash;