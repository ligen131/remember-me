import Chat from "@/components/Chat";
import "./index.scss";
import "react-calendar/dist/Calendar.css";
import arrowImg from "@assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate("/");
  };

  return (
    <div className="home">
      <img className="btn-back" src={arrowImg} onClick={backHandler}></img>
      <div className="main">
        <Chat></Chat>
      </div>
    </div>
  );
};

export default Home;
