import React from "react";
import {useLocation} from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import NavBar from "../layer/Navbar";
import ChartBoard from "../component/PriceDetail/SectionStockChart/ChartBoard";
import Footer from "../layer/Footer";
import InfoBoard from "../component/PriceDetail/SectionInfo/InfoBoard";
import NewsBoard from "../component/PriceDetail/SectionStockNews/NewsBoard";
import ScrollToTopButton from "../layer/ScrollToTopButton";

function PriceDetail(props){
    const location=useLocation();
    const code = new URLSearchParams(location.search).get('tvwidgetsymbol');
    const code_filter = code.slice(4,);

    return (
        <>
            <GlobalStyle/>
            <ScrollToTopButton />
            <NavBar/>
            <div style={{
                width: "100%",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <ChartBoard stock={code}/>
            </div>
            <div style={{
                width: "100%", marginTop: "25px",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <InfoBoard stock={code} stockFilter={code_filter}/>
            </div>
            <div style={{
                width: "100%", marginTop: "25px", marginBottom:"40px",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <NewsBoard stock={code} stockFilter={code_filter}/>
            </div>
            <Footer />
        </>
    );
}

export default PriceDetail;