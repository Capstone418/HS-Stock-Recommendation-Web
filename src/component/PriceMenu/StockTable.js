import React, {useEffect} from "react";

function StockTable(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.async = true;
        script.innerHTML = `{
            "width": "100%",
            "height": 600,
            "defaultColumn": "overview",
            "defaultScreen": "most_capitalized",
            "market": "korea",
            "showToolbar": true,
            "colorTheme": "light",
            "largeChartUrl": "http://localhost:3000/price-detail",
            "locale": "kr"
        }`;

        document.getElementById('SectionStockTable').appendChild(script);
    }, []);

    return (
        <div id={"SectionStockTable"}>

        </div>
    );
}

export default StockTable;