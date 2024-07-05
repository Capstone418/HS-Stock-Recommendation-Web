import React, {useEffect} from "react";
import Button from "react-bootstrap/Button";

function ItemAnalysis(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;
        script.innerHTML = `
        {
          "interval": "1m",
          "width": "100%",
          "isTransparent": false,
          "height": "370",
          "symbol": "${props.stock}",
          "showIntervalTabs": true,
          "displayMode": "single",
          "locale": "kr",
          "colorTheme": "light",
          "largeChartUrl": "http://localhost:3000/price-detail"
        }`;

        document.getElementById("Container-Analysis").appendChild(script);
    }, [props.stock]);

    return (
        <>
            <div id={"Container-Analysis"}>

            </div>
            <a href={`http://localhost:3000/price-detail?tvwidgetsymbol=${props.stock}`} target={"_blank"} rel={"noreferrer"}
               style={{textDecoration: "none", color: "black", marginTop:"10px"}}>
                <Button variant={"outline-secondary"}>
                    상세보기
                </Button>
            </a>
        </>
    );
}

export default ItemAnalysis;