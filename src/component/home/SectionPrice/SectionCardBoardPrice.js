import React from "react";
import Card from 'react-bootstrap/Card';

function SectionCardBoardPrice(props) {
    return (
        <Card className="text-center" style={{
            width:`${props.stylewidth}`,
            height:`${props.styleheight}`
        }}>
            <Card.Header style={{background:"#d7d4d4"}}>
                <strong>{props.cardHeader}</strong>
            </Card.Header>
            <Card.Body>
                {props.bodyContent}
            </Card.Body>
        </Card>
    );
}

export default SectionCardBoardPrice;