import React from "react";
import SectionCardBoardVolume from "./SectionCardBoardVolume";
import VolumeCard from "./VolumeCard";

function SectionVolume(props){
    return (
        <div id={"Card-Stock-Volume-Increase"} style={{
            width:"100%"
        }}>
            <SectionCardBoardVolume
                stylewidth={"100%"}
                styleheight={"400px"}
                cardHeader={"거래량 급상승"}
                bodyContent={<VolumeCard />}
            />
        </div>
    );
}

export default SectionVolume;