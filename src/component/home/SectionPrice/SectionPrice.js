import React from 'react';
import SectionCardBoardPrice from "./SectionCardBoardPrice";
import PriceCard from "./PriceCard";

function SectionPrice(props) {
    return (
        <div id={"Card-Stock-Price-Increase"} style={{
            width:"100%", marginRight:"20px"
        }}>
            <SectionCardBoardPrice
                stylewidth={"100%"}
                styleheight={"400px"}
                cardHeader={"주가 급상승"}
                bodyContent={<PriceCard/>}
            />
        </div>
    );
}

export default SectionPrice