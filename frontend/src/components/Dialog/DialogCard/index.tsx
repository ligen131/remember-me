import { DialogItem } from "@/type";
import "./index.scss";

interface DialogCardProps {
  dialog: DialogItem;
}

const DialogCard = (props: DialogCardProps) => {
  const { direction, text } = props.dialog;

  return (
    <div className={`dialog-card ${direction}`}>
      <div className="avatar"></div>
      <div className="dialog-box">
        <p className="text">{text}</p>
      </div>
    </div>
  );
};
export default DialogCard;
