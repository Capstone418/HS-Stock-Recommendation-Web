import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";
import SectionLogin from "../component/Login/SectionLogin";
import Footer from "../layer/Footer";
import SectionUserProfile from "../component/Community/SectionUserProfile";
import ScrollToTopButton from "../layer/ScrollToTopButton";

function UserProfile(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>

            <ScrollToTopButton />
            <div style={{width:"100%", marginBottom:"100px",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionUserProfile/>
            </div>

        </>
    );
}

export default UserProfile;