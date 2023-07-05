import { LightStyle } from "@/type";
import "./index.scss";

interface LightProps {
  onClick: () => void;
  img: string;
  style: LightStyle;
}

const Light = (props: LightProps) => {
  const { onClick, img, style } = props;

  return (
    <div
      className={"light"}
      onClick={onClick}
      style={{
        height: `${style.height}px`,
        width: `${style.width}px`,
        top: `${style.top}px`,
        left: `${style.left}px`,
      }}
    >
      <div className={`dot ${style.color}`}></div>
      <img src={img}></img>
    </div>
  );
};

export default Light;
