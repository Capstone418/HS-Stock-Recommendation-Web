import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";
import SectionLogin from "../component/Login/SectionLogin";
import Footer from "../layer/Footer";
import SectionCommunity from "../component/Community/SectionCommunity";
import ScrollToTopButton from "../layer/ScrollToTopButton";

function Community(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>

            <ScrollToTopButton />
            <div style={{width:"100%", marginBottom:"100px",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionCommunity />
            </div>

        </>
    );
}

export default Community;