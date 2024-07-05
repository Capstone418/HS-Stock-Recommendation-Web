import React, {useEffect} from "react";

function VolumeCard(props) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.async = true;
        script.innerHTML = `{
            "width": "100%",
            "height": 320,
            "defaultColumn": "overview",
            "defaultScreen": "volume_leaders",
            "market": "korea",
            "showToolbar": true,
            "colorTheme": "light",
            "largeChartUrl": "http://localhost:3000/price-detail",
            "locale": "kr"
        }`;

        document.getElementById('SectionVolume').appendChild(script);
    }, []);

    return (
        <div id={"SectionVolume"}>

        </div>
    );
}

export default VolumeCard;