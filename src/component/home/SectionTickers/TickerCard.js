import React, {useEffect} from "react";

function TickerCard(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        script.innerHTML = `{
            "symbols": [
            {"proName": "KRX:KOSPI", "title": "KOSPI"},
            {"proName": "KRX:KOSPI200", "title": "KOSPI200"},
            {"proName": "KRX:KOSDAQ", "title": "KOSDAQ"},
            {"proName": "FOREXCOM:SPXUSD", "title": "S&P 500 Index"},
            {"proName": "NASDAQ:NDX", "title": "NASDAQ"}
            ],
            "showSymbolLogo": true,
            "isTransparent": false,
            "displayMode": "adaptive",
            "colorTheme": "light",
            "locale": "kr"
        }`;

        document.getElementById('SectionTickers').appendChild(script);
    }, []);

    return (
        <div id={"SectionTickers"}>

        </div>
    );
}

export default TickerCard;