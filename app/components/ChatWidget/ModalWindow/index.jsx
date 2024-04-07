// importing external style
import { useState } from "react";
import { styles } from "./../styles";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
   MainContainer,
   ChatContainer,
   MessageList,
   Message,
   MessageInput,
   TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function ModalWindow(props) {
   const [messages, setMessages] = useState([
      {
         message: "Hello, I am ChatGPT! Ask me anything!",
         sentTime: "just now",
         sender: "ChatGPT",
         direction: "incoming",
      },
   ]);
   const [typing, setTyping] = useState(false);

   const handleSend = async (message) => {
      const newMessage = {
         message,
         sender: "user",
         direction: "outgoing",
      };

      const newMessages = [...messages, newMessage];

      setMessages(newMessages);

      setTyping(true);
      await processChatMessageToChatGPT(newMessages);
   };

   async function processChatMessageToChatGPT(chatMessages) {
      let apiMessages = chatMessages.map((messageObject) => {
         let role = "";
         if (messageObject.sender === "ChatGPT") {
            role = "assistant";
         } else {
            role = "user";
         }
         return { role: role, content: messageObject.message };
      });

      const systemMessage = {
         role: "system",
         content: "Explain all concepts like I am 10 years old.",
      };

      const apiRequestBody = {
         model: "gpt-3.5-turbo",
         messages: [systemMessage, ...apiMessages],
      };

      try {
         const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
               Authorization: "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
         });

         if (!response.ok) {
            throw new Error("Network response was not ok");
         }

         const data = await response.json();

         setMessages([
            ...chatMessages,
            {
               message: data.choices[0].message.content,
               sender: "ChatGPT",
               direction: "incoming",
            },
         ]);

         setTyping(false);
      } catch (error) {
         console.error("There was a problem with the fetch operation:", error);
         // Handle error gracefully, e.g., show a message to the user
      }
   }

   // returning display
   return (
      <div
         style={{
            ...styles.modalWindow,
            ...{ opacity: props.visible ? "1" : "0" },
         }}
      >
         <MainContainer>
            <ChatContainer>
               <MessageList
                  scrollBehavior="smooth"
                  typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
               >
                  {messages.map((message, i) => {
                     return (
                        <div
                           key={i}
                           style={{ textAlign: message.sender === "ChatGPT" ? "left" : "right" }}
                        >
                           <Message model={message} />
                        </div>
                     );
                  })}
               </MessageList>
               <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
         </MainContainer>
      </div>
   );
}
export default ModalWindow;

/* 
CREDIT: 
Chat window: https://youtu.be/Lag9Pj_33hM
*/
