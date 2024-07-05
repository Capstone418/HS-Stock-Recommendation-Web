import React, {useEffect} from "react";

function ItemMiniChart(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.async = true;
        script.innerHTML = `
        {
          "symbol": "${props.stock}",
          "width": "100%",
          "height": "230",
          "locale": "kr",
          "dateRange": "12M",
          "colorTheme": "light",
          "isTransparent": false,
          "autosize": true,
          "largeChartUrl": "http://localhost:3000/price-detail",
          "chartOnly": false
        }`;

        document.getElementById("Container-Mini-Chart").appendChild(script);
    }, [props.stock]);

    return (
        <div id={"Container-Mini-Chart"}>

        </div>
    );
}

export default ItemMiniChart;