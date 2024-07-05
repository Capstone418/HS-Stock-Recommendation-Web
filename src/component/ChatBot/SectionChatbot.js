import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card'
import {FloatingLabel, Form} from "react-bootstrap";

const styles = {
    container: {
        background: '#f0f0f0',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
    },
    userMessage: {
        marginBottom: '5px',
        color: '#333',
    },
    chatAIMessage: {
        color: '#222',
    }
};

/*
    1. [^.!?\n]+[.!?]?\s*: 문장부호(., !, ?), 줄바꿈(\n)이 아닌 문자를 가능한 많이 일치, 선택적으로 문장부호와 공백 포함.
    2. [\d]+\.\s*: 번호 목록을 처리를 위한 숫자와 점(.),선택적으로 뒤따르는 공백 일치.
    3. :\s*: 콜론(:), 선택적으로 뒤따르는 공백 일치.
    4. [^.!?\n]+: 문장부호, 줄바꿈이 아닌 문자를 가능한 많이 일치.
    * */

function SectionChatbot(props) {
    const [userInput, setUserInput] = useState(""); // 사용자 입력 질문
    const [historyList, setHistoryList] = useState([]); // 대화 내역
    const [loginId, setLoginId] = useState(""); // 사용자 아이디
    const cardRef = useRef(null); // 대화 내역 박스 높이 동적 조절을 위한 ref
    const inputRef = useRef(null); // 동적 입력창 높이를 위한 ref

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setLoginId(storedUsername);
        //alert(storedUsername);
        axios.post('/api/chatbot-init', {username:storedUsername, text:""})
            .then(response => {
                setHistoryList(response.data);
                //console.log(historyList)
            })
            .catch(error => {
                console.error("SectionChatbot.js -> chatbot-init 에러 : ", error)
            })
    }, []);

    useEffect(() => {
        if (cardRef.current) {
            const cardHeight = cardRef.current.scrollHeight;
            cardRef.current.style.height = cardHeight + "px";
        }
    }, [historyList]);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [historyList]);

    const handleSubmit = async () => {
        if(!userInput.trim()||inputRef.current.disabled === true) {
            return;
        }
        try {
            setUserInput("답변 처리 중입니다. 15~30초 정도 기다려주시면 감사하겠습니다.");
            inputRef.current.disabled = true; // input 태그 입력 block 처리
            const response = await axios.post('/api/chatbot-answer', {username:loginId, text:userInput});
            setHistoryList(response.data);
            setUserInput("");
            inputRef.current.disabled = false; // input 태그 입력 activate 처리
        } catch (error) {
            console.error("SectionChatbot.js -> chatbot-answer 에러 : ", error);
            setUserInput("");
            inputRef.current.disabled = false;
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        adjustInputHeight();
    };

    const adjustInputHeight = () => {
        const input = inputRef.current;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
        if (input.scrollHeight > 200) {
            input.style.overflowY = 'scroll';
            input.style.height = '200px';
        } else {
            input.style.overflowY = 'hidden';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            setUserInput(userInput + '\n');
            adjustInputHeight();
        }
        else if(e.key === 'Enter'){
            e.preventDefault();
            handleSubmit();
        }
    };

    const renderMessages = () => {
        return (
            <div>
                <div style={styles.container}>
                    <div style={styles.userMessage}>
                        <img alt="" src="chatgpt_64.png"
                             width="50" height="50"
                             className="d-inline-block align-top"
                        />{' '} Chat 서버와 연결되었습니다.
                        <p>
                            ChatAI를 만나보세요!
                            다음의 주의사항을 참고해보세요!
                            <ul>
                                <li>직접적인 투자 행동과 관련된 질문에 대해 답변 불가.</li>
                                <li>웹사이트와 관련된 질문에 대해 부정확한 답변이 나올 수 있다.(가능은 합니다!)</li>
                                <li>ChatAI는 실수가 많습니다. 부정확한 답변인 경우, 다시 한번 요청해보세요.</li>
                                <li>답변 내용에 따라 결정을 내리실 때, 신중을 가하세요! 투자 책임은 본인에게 있습니다.</li>
                            </ul>
                        </p>
                    </div>
                </div>
                {
                    historyList.map((item, index) => (
                        <div key={index} style={styles.container}>
                            <div style={styles.userMessage}>
                                <h3>
                                    <img alt="" src="user_64.png"
                                         width="30" height="30"
                                         className="d-inline-block align-top"
                                    />{' '}
                                    You
                                </h3>
                                <p style={{marginLeft: "40px"}}>{item.req_msg}</p>
                            </div>
                            <div style={styles.chatAIMessage}>
                                <h3>
                                    <img alt="" src="chatgpt-48.png"
                                         width="35" height="35"
                                         className="d-inline-block align-top"
                                    />{' '}
                                    ChatAI
                                </h3>
                                {item.res_msg.match(/[^.!?\n]+[.!?]?\s*|[\d]+\.\s*|:\s*|[^.!?\n]+/g).map((sentence, idx) => (
                                    <p key={idx} style={{marginLeft: "40px"}}>{sentence.trim()}</p>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    };

    return (
        <>
            <Card border={"light"} style={{
                width: "60%", height: "800px", marginTop: "100px",
                marginBottom: "5px", textAlign: "left"
            }} ref={cardRef}>
                {renderMessages()}
            </Card>

            <div style={{
                position: "fixed", width: "60%", bottom: "-2px", marginLeft: "20%",
                marginRight: "20%", background: "white"
            }}>
                <FloatingLabel controlId={"floatingInput"} label={"Message..."} className={"mb-3"}>
                    <Form.Control as={"textarea"} placeholder={"input your messages"} ref={inputRef}
                                  value={userInput}
                                  style={{
                                      paddingRight: "40px", width: "100%", borderWidth: "2px", borderColor: "black",
                                      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)"}}
                                  onChange={handleInputChange}
                                  onKeyDown={handleKeyDown}/>
                    <button type="submit" onClick={handleSubmit} style={{
                        position: "absolute",
                        right: "0",
                        bottom: "0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "10px",
                        marginBottom: "10px"
                    }}>
                        <img alt="" src="submit_64.png"
                             width="30" height="30"
                             className="d-inline-block align-top"
                        />{' '}
                    </button>
                </FloatingLabel>
                <p>
                    <mark>
                        <strong>답변에 대해 정확하지 않을 수 있습니다. 내용을 확인하시고, 신중한 결정하시길 바랍니다.</strong>
                    </mark>
                </p>
            </div>
        </>
    );
}

export default SectionChatbot;
