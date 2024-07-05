import React from "react";
import NavBar from "../layer/Navbar";
import SectionChatbot from "../component/ChatBot/SectionChatbot";
import ScrollToTopButton from "../layer/ScrollToTopButton";
import ScrollToBottomButton from "../layer/ScrollToBottomButton";
function ChatBot(props) {
    return (
      <>
          <NavBar />
          <ScrollToTopButton />
          <ScrollToBottomButton />
          <div style={{width:"100%", marginBottom:"100px",
          display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}} className={"text-center"}>
              <SectionChatbot />
          </div>
      </>
    );
}

export default ChatBot