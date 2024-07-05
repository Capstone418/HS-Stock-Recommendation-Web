import React, {useEffect} from "react";
import Card from "react-bootstrap/Card";

function HitMapBoard(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
        script.async = true;
        script.innerHTML = `
        {
          "exchanges": [],
          "dataSource": "AllKR",
          "grouping": "sector",
          "blockSize": "market_cap_basic",
          "blockColor": "change",
          "locale": "kr",
          "symbolUrl": "",
          "colorTheme": "light",
          "hasTopBar": false,
          "isDataSetEnabled": false,
          "isZoomEnabled": true,
          "hasSymbolTooltip": true,
          "width": "100%",
          "height": "100%"
        }`;

        document.getElementById("Container-Hit-Map").appendChild(script);
    }, []);

    return (
        <div style={{width:"60%"}}>
            <Card>
                <Card.Header className={"text-center"} style={{background:"#d7d4d4"}}><strong>업종별 히트맵</strong></Card.Header>
                <Card.Body className={"text-center"}>
                    <div id={"Container-Hit-Map"} style={{height:"500px"}}>

                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default HitMapBoard;