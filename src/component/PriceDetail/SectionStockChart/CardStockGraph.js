import React from "react";
import TradingViewWidget from "react-tradingview-widget";

function CardStockGraph(props) {
    const widgetStyle = {
        width: "100%",
        height: "350px",
        style: "2",
        gridColor: "rgba(242, 242, 242, 1)"
    };

    return (
        <>
            <TradingViewWidget
                symbol={props.stock}
                locale={"kr"}
                {...widgetStyle}
                interval={"D"}
                timezone={"Etc/UTC"}
                enable_publishing={"false"}
                save_image={"false"}
                calendar={"false"}
            />
        </>
    );
}

export default CardStockGraph;