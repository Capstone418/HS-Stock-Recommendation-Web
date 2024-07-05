import React from "react";
import SectionCardBoardNews from "./SectionCardBoardNews";

function SectionNews(props) {
    return (
        <div id={"Card-Stock-News"} style={{
            width:"67%"
        }}>
            <SectionCardBoardNews
                stylewidth={"100%"}
                styleheight={"690px"}
                cardHeader={"최신 뉴스"}
                bodyContent={"Card"}
            />
        </div>
    );
}

export default SectionNews;