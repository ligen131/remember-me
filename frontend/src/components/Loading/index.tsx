import "./index.scss";
import paw from "@assets/paw.svg";

const Loading = () => {
  return (
    <div className="loading">
      <div className="paws">
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
        <img className="paw" src={paw}></img>
      </div>
    </div>
  );
};

export default Loading;
