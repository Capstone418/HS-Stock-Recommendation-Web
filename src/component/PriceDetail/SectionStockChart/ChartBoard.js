import React from "react";
import CardStockGraph from "./CardStockGraph";

function ChartBoard(props) {
    return (
        <div style={{width: "60%", marginTop:"100px"}}>
            <CardStockGraph stock={props.stock}/>
        </div>
    );
}

export default ChartBoard;