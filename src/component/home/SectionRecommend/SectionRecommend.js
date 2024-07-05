import React,{useEffect,useState} from "react";
import axios from "axios";
import SectionCardBoardRecommend from "./SectionCardBoardRecommend"

function SectionRecommend(props) {
    const [recommendStocks, setRecommendStocks] = useState([]);

    useEffect(() => {
        axios.get('/api/home')
            .then(response => {
                setRecommendStocks(response.data);
            })
            .catch(error => {
                console.error('Error fetching data[SectionRecommend]:', error);
            });
    }, []);

    return (
        <div id={"Card-Stock-Recommend"} style={{
            width:"100%", marginTop:"30px",
            display:"flex", justifyContent:"center", alignItems:"center"
        }}>
            <SectionCardBoardRecommend
                cardHeader={"추천 종목"}
                stylewidth={"67%"}
                styleheight={"470px"}
                codes={recommendStocks.map(stock => (
                    stock.code
                ))}
            />
        </div>
    );
}

export default SectionRecommend;