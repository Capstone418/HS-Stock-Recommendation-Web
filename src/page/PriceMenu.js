import React from "react";
import NavBar from "../layer/Navbar";
import Footer from "../layer/Footer";
import HitMapBoard from "../component/PriceMenu/SectionHitmap/HitMapBoard";
import TableBoard from "../component/PriceMenu/SectionTable/TableBoard";
import ScrollToTopButton from "../layer/ScrollToTopButton";

function PriceMenu(props) {
    return (
        <>
            <NavBar/>
            <ScrollToTopButton />
            <div style={{
                width: "100%",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <TableBoard/>
            </div>
            <div style={{
                width: "100%", marginTop: "50px",marginBottom:"80px",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <HitMapBoard/>
            </div>
            <Footer/>
        </>
    );
}

export default PriceMenu;