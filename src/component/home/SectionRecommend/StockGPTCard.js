import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ListGroup from 'react-bootstrap/ListGroup';

function StockGPTCard(props){

    return (
        <Card>
            <Card.Header className={"text-center"}>
                <img alt="" src="chatgpt-48.png"
                     width="18" height="18"
                />
                <strong>ChatGPT 분석</strong>
            </Card.Header>
            <Card.Body className={"text-start"} style={{
                overflowY: "auto", maxHeight: "290px",
                overflowX: "auto", maxWidth: "100%"
            }}>
                <ListGroup className={"my-2"}>
                    <ListGroup.Item className={"text-center"}>
                        <strong>감성분석</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className={"text-center"}>
                        {props.total > 0 && <Badge pill bg={"success"}>긍정</Badge>}
                        {props.total === 0 && <Badge pill bg={"warning"}>중립</Badge>}
                        {props.total < 0 && <Badge pill bg={"success"}>부정</Badge>}
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup className={"my-2"}>
                    <ListGroup.Item className={"text-center"}>
                        <strong>주요키워드</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className={"text-center"}>
                        <Badge pill bg={"secondary"}>
                            {props.keyword1==='' ? "None":props.keyword1}
                        </Badge>
                        &nbsp;
                        <Badge pill bg={"secondary"}>
                            {props.keyword2==='' ? "None":props.keyword2}
                        </Badge>
                        &nbsp;
                        <Badge pill bg={"secondary"}>
                            {props.keyword3==='' ? "None":props.keyword3}
                        </Badge>
                        &nbsp;
                        <Badge pill bg={"secondary"}>
                            {props.keyword4==='' ? "None":props.keyword4}
                        </Badge>
                        &nbsp;
                        <Badge pill bg={"secondary"}>
                            {props.keyword5==='' ? "None":props.keyword5}
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup className={"my-2"}>
                    <ListGroup.Item className={"text-center"}>
                            <Card.Title className={"mb-sm-2"} style={{fontSize:"15px"}}>
                                <strong>주가동향 분석</strong>
                            </Card.Title>
                        <Card.Subtitle className={"text-muted"}>주가+뉴스</Card.Subtitle>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {props.content}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default StockGPTCard;