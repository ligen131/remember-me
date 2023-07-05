import { DialogItem } from "@/type";
import ChatInput from "../ChatInput";
import "./index.scss";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import ask from "@/network/api/ask";

const Chat = () => {
  const [dialogList, setDialogList] = useState<Array<DialogItem>>([]);

  const onInputFinish = (text: string) => {
    Promise.resolve()
      .then(() => {
        setDialogList((dialogList) =>
          dialogList.concat([{ direction: "right", text }])
        );
      })
      .then(() => {
        ask(text).then((res) => {
          console.log(res);
          if (!res) return;
          setDialogList((dialogList) =>
            dialogList.concat([{ direction: "left", text: res.answer }])
          );
          console.log(dialogList);
        });
      });
  };

  return (
    <div className="chat">
      <Dialog dialogList={dialogList}></Dialog>
      <ChatInput onInputFinish={onInputFinish}></ChatInput>
    </div>
  );
};

export default Chat;
