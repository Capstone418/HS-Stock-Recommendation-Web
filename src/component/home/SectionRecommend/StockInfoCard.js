import React,{useEffect} from "react";
import Card from "react-bootstrap/Card";

function StockInfoCard(props){

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js';
        script.async = true;
        script.innerHTML = `{
            "symbol": "KRX:${props.stock}",
            "width": "100%",
            "locale": "kr",
            "colorTheme": "light",
            "largeChartUrl": "http://localhost:3000/price-detail",
            "isTransparent": false
        }`;

        document.getElementById(`"container-stock-detail-${props.stock}"`).appendChild(script);
    }, [props.stock]);

    return (
        <>
            <Card>
                <Card.Header className={"text-center"}><strong>주가 정보</strong></Card.Header>
                <Card.Body className={"text-center"}>
                    <div id={`"container-stock-detail-${props.stock}"`}>

                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default StockInfoCard;