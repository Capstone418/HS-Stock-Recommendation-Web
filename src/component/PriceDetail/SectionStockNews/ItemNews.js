import React, {useEffect, useState} from "react";
import {MDBTable} from "mdb-react-ui-kit";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

function MyVerticallyCenteredModal(props) {
    const [bodyFlag, setBodyFlag] = useState(false);
    const [topicData, setTopicData] = useState(null);

    const zip = (arr1, arr2) => {
        return arr1.map((elem, index) => [elem, arr2[index]]);
    };

    useEffect(() => {
        if (props.show && props.title) {
            setBodyFlag(false);
            axios.post('/api/news-topic', {title: props.title})
                .then(response => {
                    setBodyFlag(true);
                    setTopicData(response.data);
                })
                .catch(error => {
                    console.error('topicData 에러 : ' + error);
                });
        }
    }, [props.show, props.title]);

    return (
        <Modal
            {...props} size={"lg"} aria-labelledby={"contained-modal-title-vcenter"} centered>
            <Modal.Header closeButton>
                <Modal.Title id={"contained-modal-title-vcenter"}>
                    <span dangerouslySetInnerHTML={{__html: props.title}}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4><mark>뉴스 핵심 요약</mark></h4>
                <p>{!bodyFlag && <Spinner animation={"border"}/>}</p>
                <p>
                    {bodyFlag && topicData.summary && (
                        <p>{topicData.summary}</p>
                    )}
                    {bodyFlag && topicData.summary==="" && (
                        <p>해당 내용이 없습니다.</p>
                    )}
                </p>
            </Modal.Body>
            <Modal.Body>
                <h4>
                    <mark>토픽 인사이트 Q&A</mark>
                </h4>
                <p>{!bodyFlag && <Spinner animation={"border"}/>}</p>
                <p>
                    <Accordion>
                        {bodyFlag && topicData.questions.length>0 && zip(topicData.questions, topicData.answers).map(([question, answer], index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{question}</Accordion.Header>
                                <Accordion.Body>{answer}</Accordion.Body>
                            </Accordion.Item>
                        ))}
                        {bodyFlag && topicData.questions.length===0 && (
                            <p>해당 내용이 없습니다.</p>
                        )}
                    </Accordion>
                </p>
            </Modal.Body>
            <Modal.Body>
                <p className={"text-muted"}>
                    <p>이 컨텐츠는 Chatgpt를 사용하여 생성되었으며, 해당 뉴스 기사를 활용하였지만 정보의 정확성이나 완전성이 보장되지 않을 수 있습니다.</p>
                    <p>본 컨텐츠 제공자는 오류나 부정확한 정보에 대한 책임을 지지 않으며, 독자는 추가적인 확인 및 연구가 필요하다는 점을 인지해야 합니다.</p>
                    <p>요약 또는 인사이트가 빈 칸이라면, 현재 창을 종료 후 '토픽 인사이트'버튼 재클릭하시면 정상적으로 내용 확인이 가능합니다. 여러 번 시도가 필요할 수 있다는 점에 대해 양해 부탁드립니다.</p>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ItemNews(props) {
    const [modalShow, setModalShow] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const garbageWarning = () => {
        return <MDBTable></MDBTable>
    }

    //console.log('####111')
    //console.log(props.data)
    //console.log(props.data.length)

    return (
        <>
            {garbageWarning}
            {
                props.data.length !== 0 ? props.data.map(item => {
                        return (
                            <tr>
                                <td colSpan={11}>
                                    <a href={item.url} target={"_blank"} rel={"noreferrer"}
                                       style={{textDecoration: "none", color: "black"}}>
                                        <div className={"d-flex align-items-center"}>
                                            <img src={item.image} width={"110"} height={"110"} alt={"Null"}
                                                 className={"rounded-4"}/>
                                            <div className={"ms-0"}>
                                                <span dangerouslySetInnerHTML={{__html: item.title}}/>
                                            </div>
                                        </div>
                                    </a>
                                </td>
                                <td>
                                    <small className={"text-muted"}>Naver</small>
                                </td>
                                <td>
                                    <small className={"text-muted"}>{formatDate(item.date)}</small>
                                </td>
                                <td>
                                    <Button
                                        variant={"outline-dark"}
                                        style={{ width: "auto" }}
                                        onClick={() => setModalShow(item.title)} // item.title을 인자로 전달
                                    >
                                        토픽 인사이트
                                    </Button>

                                    <MyVerticallyCenteredModal
                                        show={modalShow === item.title} // modalShow가 현재 클릭된 아이템의 title과 일치하는 경우만 모달을 보여줌
                                        onHide={() => setModalShow(false)} // 모달 닫기
                                        title={modalShow === item.title ? item.title : null} // 클릭된 아이템의 title과 일치할 때만 title을 전달
                                    />
                                </td>
                            </tr>
                        )
                    })
                    : (
                        <tr>
                            <td colSpan={13} className={"text-center"}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </td>
                        </tr>
                    )
            }
        </>
    );
}

export default ItemNews;