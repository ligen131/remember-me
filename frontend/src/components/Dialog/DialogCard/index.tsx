import { DialogItem } from "@/type";
import "./index.scss";
import userImg from "@assets/user.png";
import botImg from "@assets/bot.png";

interface DialogCardProps {
  dialog: DialogItem;
}

const DialogCard = (props: DialogCardProps) => {
  const { direction, text } = props.dialog;

  return (
    <div className={`dialog-card ${direction}`}>
      <div className="avatar">
        <img src={direction === "left" ? botImg : userImg}></img>
      </div>
      <div className="dialog-box">
        <p className="text">{text}</p>
      </div>
    </div>
  );
};
export default DialogCard;
