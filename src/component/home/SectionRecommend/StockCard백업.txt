import React from "react";
import TradingViewWidget from "react-tradingview-widget";

function StockCard(props) {
    return (
        <>
            <TradingViewWidget
                symbol={props.stockname}
                locale={"kr"}
                width={"100%"}
                height={"320px"}
                theme={"light"}
                interval={"D"}
                timezone={"Etc/UTC"}
                style="2"
                enable_publishing={"false"}
                gridColor={"rgba(242, 242, 242, 1)"}
                save_image={"false"}
                calendar={"false"}
            />
        </>
    );
}

export default StockCard;