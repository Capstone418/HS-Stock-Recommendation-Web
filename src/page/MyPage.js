import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";
import SectionLogin from "../component/Login/SectionLogin";
import Footer from "../layer/Footer";
import SectionCommunity from "../component/Community/SectionCommunity";
import ScrollToTopButton from "../layer/ScrollToTopButton";
import SectionMyPage from "../component/MyPage/SectionMyPage";

function MyPage(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>

            <ScrollToTopButton />
            <div style={{width:"100%", marginBottom:"100px",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionMyPage />
            </div>

        </>
    );
}

export default MyPage;