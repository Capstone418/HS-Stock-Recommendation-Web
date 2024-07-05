import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import StockInfoCard from "./StockInfoCard";
import StockGPTCard from "./StockGPTCard";
import axios from "axios";

function SectionRecommendTab(props) {
    const [key, setKey] = useState(props.codes[1]);
    const [recommendEmotions, setRecommendEmotions] = useState([]);
    const [recommendTrends, setRecommendTrends] = useState([]);
    const [recommendKeywords, setRecommendKeywords] = useState([]);

    useEffect(() => {
        axios.get('/api/home/emotion')
            .then(response => {
                setRecommendEmotions(response.data)
            })
            .catch(error => {
                console.error('Error fetching data[StockGPTCard]:', error);
            });
        axios.get('/api/home/trend')
            .then(response => {
                setRecommendTrends(response.data);
            })
            .catch(error => {
                console.error('Error fetching data[SectionRecommend_trend]: ', error);
            });
        axios.get('/api/home/keywords')
            .then(response => {
                setRecommendKeywords(response.data);
            })
            .catch(error => {
                console.error('Error fetching data[SectionRecommend_keywords]: ', error);
            });
    }, []);

    const combinedEmotionsTrendsKeywords = recommendEmotions.map(itemEmotion => {
        const matchingItemTrends = recommendTrends.find(itemTrend => itemTrend.code === itemEmotion.code);
        const matchingItemKeywords = recommendKeywords.find(itemKeywords => itemKeywords.code === itemEmotion.code);

        return {
            ...itemEmotion,
            ...matchingItemKeywords,
            ...matchingItemTrends
        };
    });

    /*
    console.log(recommendEmotions);
    console.log(recommendTrends);
    console.log(recommendKeywords);
    */

    console.log(combinedEmotionsTrendsKeywords);

    return (
        <Tabs
            id="stocks-Trend-Tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            {combinedEmotionsTrendsKeywords.map((item) => (
                <Tab eventKey={item.code} title={item.code}>
                    <div id={"container-recommend-stock"} style={{width:"100%",height:"290px",
                        display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <div id={"container-recommend-stock-info"} style={{width:"50%", height:"100%"}}>
                            <StockInfoCard stock={item.code} />
                        </div>
                        <div id={"container-recommend-stock-chatgpt"} style={{
                            width:"50%", height:"100%", marginLeft:"10px"
                        }}>
                            <StockGPTCard
                                stock={item.code}
                                total={item.total_score}
                                keyword1={item.keyword1}
                                keyword2={item.keyword2}
                                keyword3={item.keyword3}
                                keyword4={item.keyword4}
                                keyword5={item.keyword5}
                                content={item.content}
                            />
                        </div>
                    </div>
                </Tab>
            ))}

        </Tabs>
    );
}

export default SectionRecommendTab;