import "./index.scss";
import testImg from "@assets/test.jpg";

interface LightProps {
  onClick: () => void;
}

const Light = (props: LightProps) => {
  const { onClick } = props;

  return (
    <div className="light" onClick={onClick}>
      <div className="dot"></div>
      <img src={testImg}></img>
    </div>
  );
};

export default Light;
