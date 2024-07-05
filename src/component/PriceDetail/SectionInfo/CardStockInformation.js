import React,{useEffect} from "react";

function CardStockInformation(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
        script.async = true;
        script.innerHTML = `{
              "width": "100%",
              "height": 400,
              "isTransparent": false,
              "colorTheme": "light",
              "symbol": "${props.stock}",
              "locale": "en",
              "largeChartUrl": "http://localhost:3000/price-detail"
        }`;

        document.getElementById('Card-Stock-Information').appendChild(script);
    }, [props.stock]);

    return (
        <div id={"Card-Stock-Information"}>

        </div>
    );
}

export default CardStockInformation;