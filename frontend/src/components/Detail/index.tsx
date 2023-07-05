import "./index.scss";
import testImg from "@assets/test.jpg";

interface DetailProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const Detail = (props: DetailProps) => {
  const { isShow, setIsShow } = props;

  return (
    <div className={isShow ? "detail" : "hidden"}>
      <div className="mask" onClick={setIsShow.bind(this, false)}></div>
      <div className="detail-box">
        <div className="left">
          <img src={testImg}></img>
        </div>
        <div className="right">
          <p className="title">Test</p>
          <p className="content">Hello World</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
