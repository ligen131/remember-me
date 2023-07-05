import { DialogItem } from "@/type";
import ChatInput from "../ChatInput";
import "./index.scss";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import ask from "@/network/api/ask";
import Loading from "@components/Loading";

const Chat = () => {
  const [dialogList, setDialogList] = useState<Array<DialogItem>>([]);
  const [loading, setLoading] = useState(false);

  const onInputFinish = (text: string) => {
    setLoading(true);
    Promise.resolve()
      .then(() => {
        setDialogList((dialogList) =>
          dialogList.concat([{ direction: "right", text }])
        );
      })
      .then(() => {
        ask(text).then((res) => {
          setLoading(false);
          if (!res) return;
          setDialogList((dialogList) =>
            dialogList.concat([{ direction: "left", text: res.answer }])
          );
        });
      });
  };

  return (
    <div className="chat">
      <Dialog dialogList={dialogList}></Dialog>
      <div className={loading ? "loading" : "loading hidden"}>
        <Loading></Loading>
      </div>
      <ChatInput onInputFinish={onInputFinish}></ChatInput>
    </div>
  );
};

export default Chat;
