import React from "react";
import NavBar from "../layer/Navbar";
import GlobalStyle from "../GlobalStyle";
import SectionLogin from "../component/Login/SectionLogin";
import Footer from "../layer/Footer";

function Login(props) {
    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <div style={{width:"100%", marginBottom:"100px",
                display:"flex", justifyContent:"center", alignItems:"center"}} className="text-center">
                <SectionLogin />
            </div>
            <Footer/>
        </>
    );
}

export default Login;