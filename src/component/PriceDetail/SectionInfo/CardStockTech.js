import React, {useEffect} from "react";

function CardStockTech(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
        script.async = true;
        script.innerHTML = `{
            "isTransparent": false,
              "largeChartUrl": "http://localhost:3000/price-detail",
              "displayMode": "adaptive",
              "width": "100%",
              "height": "400",
              "colorTheme": "light",
              "symbol": "${props.stock}",
              "locale": "kr"
        }`;

        document.getElementById('Card-Stock-Tech').appendChild(script);
    }, [props.stock]);

    return (
        <div id={"Card-Stock-Tech"}>

        </div>
    );
}

export default CardStockTech;