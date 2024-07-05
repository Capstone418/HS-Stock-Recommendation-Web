import React, {useEffect} from "react";

function PriceCard(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.async = true;
        script.innerHTML = `{
            "width": "100%",
            "height": 320,
            "defaultColumn": "overview",
            "defaultScreen": "top_gainers",
            "market": "korea",
            "showToolbar": true,
            "colorTheme": "light",
            "largeChartUrl": "http://localhost:3000/price-detail",
            "locale": "kr"
        }`;

        document.getElementById('SectionPrice').appendChild(script);
    }, []);

    return (
        <div id={"SectionPrice"}>

        </div>
    );
}

export default PriceCard;