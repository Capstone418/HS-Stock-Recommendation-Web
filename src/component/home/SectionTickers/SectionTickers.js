import React from "react";
import SectionCardBoardTickers from "./SectionCardBoardTickers";
import TickerCard from "./TickerCard";

function SectionTickers(props) {
    return (
        <div id={"Card-Stock-Field"} style={{
            width:"67%", marginTop:"100px"
        }}>
            <SectionCardBoardTickers
                stylewidth={"100%"}
                styleheight={"110px"}
                cardHeader={"국내/해외 주요 증시 현황"}
                bodyContent={<TickerCard/>}
            />
        </div>
    );
}

export default SectionTickers;