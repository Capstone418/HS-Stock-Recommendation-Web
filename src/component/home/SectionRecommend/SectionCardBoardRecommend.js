import React from "react";
import Card from 'react-bootstrap/Card';
import SectionRecommendTab from "./SectionRecommendTab";

function SectionCardBoardRecommend(props) {

    return (
        <Card className="text-center" style={{
            width:`${props.stylewidth}`,
            height:`${props.styleheight}`
        }}>
            <Card.Header style={{background:"#d7d4d4"}}>
                <strong>{props.cardHeader}</strong>
            </Card.Header>
            <Card.Body>
                <SectionRecommendTab codes={props.codes.map(item => (
                    item
                ))}/>
            </Card.Body>
        </Card>
    );
}

export default SectionCardBoardRecommend;