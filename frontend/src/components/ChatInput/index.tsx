import "./index.scss";
import sendImg from "@assets/send.svg";
import { useState } from "react";

interface ChatInputProps {
  onInputFinish: (text: string) => void;
}

const ChatInput = (props: ChatInputProps) => {
  const [text, setText] = useState("");
  const { onInputFinish } = props;

  const onInputChange = (e: any) => {
    setText(e.target.value);
  };

  const sendHandler = () => {
    onInputFinish(text);
    setText("");
  };

  return (
    <div className="chat-container">
      {/* <div className="upload">
        <img src={uploadImg}></img>
      </div> */}
      <div className="chat-input">
        <textarea
          className="input"
          onChange={onInputChange}
          value={text}
        ></textarea>
        <img
          className="send"
          src={sendImg}
          onClick={sendHandler.bind(this)}
        ></img>
      </div>
    </div>
  );
};

export default ChatInput;
