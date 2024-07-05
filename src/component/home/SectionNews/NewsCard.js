import React from "react";
import {
    MDBCard,
    MDBCol,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBFooter
} from "mdb-react-ui-kit";
import Badge from "react-bootstrap/Badge";

function NewsCard(props) {
    // 날짜를 받아서 'YYYY-MM-DD H:M:S' 형식으로 변환하는 함수
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

    return (
        /*
        <div>
            <p>{props.code}</p>
            <p>{formatDate(props.date)}</p>
            <p>{props.title}</p>
            <p>{props.score}</p>
            <p>{props.keyword1} {props.keyword2} {props.keyword3} {props.keyword4} {props.keyword5}</p>
            <p>{props.summary}</p>
            <p>{props.image}</p>
            <p>{props.url}</p>
            <p>{props.content}</p>
            <p></p>
        </div>
         */
        <MDBCol>
            <MDBCard className={"h-auto"}>
                <a href={props.url} target={"_blank"} rel={"noreferrer"} style={{textDecoration:"none", color:"black"}}>
                    <MDBCardImage src={props.image} className={"w-100"} alt={"이미지 없음"} position={"top"} width={"300"} height={"150"}/>
                </a>
                    <MDBCardBody>
                        <MDBCardTitle style={{fontSize: "15px"}}>
                            <a href={props.url} target={"_blank"} rel={"noreferrer"}
                               style={{textDecoration: "none", color: "black"}}>
                                <span dangerouslySetInnerHTML={{__html: props.title}}/>
                            </a>
                        </MDBCardTitle>
                        <p>
                            {props.score > 0 && <Badge pill bg={"success"}>긍정</Badge>}
                            {props.score === 0 && <Badge pill bg={"warning"}>중립</Badge>}
                            {props.score < 0 && <Badge pill bg={"success"}>부정</Badge>}
                            <p>
                                <small className={"text-muted"}>KRX:{props.code}</small>
                                <br/>
                                <small className={"text-muted"}>{formatDate(props.date)}</small>
                            </p>
                        </p>
                        <MDBCard shadow={"0"} border={"dark"} background={"white"}
                                 style={{overflowY: "auto", maxHeight: "200px"}}>
                            <MDBCardHeader className={"text-center"}>
                                <img alt="" src="chatgpt-48.png"
                                     width="28" height="28"
                                />
                                <strong style={{fontSize:"14px"}}>ChatGPT 요약</strong>
                            </MDBCardHeader>
                            <MDBCardText>
                                {props.summary}
                            </MDBCardText>
                        </MDBCard>
                    </MDBCardBody>
                <hr/>
                <MDBFooter>
                    <small>
                        <p>
                            <Badge pill bg={"secondary"}>{props.keyword1==='' ? "None":props.keyword1}</Badge>
                            &nbsp;
                            <Badge pill bg={"secondary"}>{props.keyword2==='' ? "None":props.keyword2}</Badge>
                        </p>
                        <Badge pill bg={"secondary"}>{props.keyword3==='' ? "None":props.keyword3}</Badge>
                        &nbsp;
                        <Badge pill bg={"secondary"}>{props.keyword4==='' ? "None":props.keyword4}</Badge>
                        &nbsp;
                        <Badge pill bg={"secondary"}>{props.keyword5==='' ? "None":props.keyword5}</Badge>
                    </small>
                    <p></p>
                </MDBFooter>
            </MDBCard>
        </MDBCol>
    );
}

export default NewsCard;