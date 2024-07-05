import React from "react";
import CardStockTech from "./CardStockTech";
import CardStockInformation from "./CardStockInformation";

function InfoBoard(props) {
    return (
        <div style={{width: "60%", display: "flex", flexDirection: "row"}}>
            <div style={{width: "50%", height:"400px", background: "gray", marginRight:"10px"}}>
                <CardStockInformation stock={props.stock}/>
            </div>
            <div style={{width: "50%", height:"400px"}}>
                <CardStockTech stock={props.stock} />
            </div>
        </div>
    );
}

export default InfoBoard;