import { DialogItem } from "@/type";
import DialogCard from "./DialogCard";
import "./index.scss";
import { useRef, useEffect } from "react";

interface DialogProps {
  dialogList: Array<DialogItem>;
}

const Dialog = (props: DialogProps) => {
  const { dialogList } = props;
  const dialogRef: any = useRef();

  const scrollToBottom = () => {
    if (dialogRef && dialogRef.current) {
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [dialogList]);

  return (
    <div className="dialog" ref={dialogRef}>
      {dialogList.map((item) => {
        return <DialogCard dialog={item}></DialogCard>;
      })}
    </div>
  );
};

export default Dialog;
