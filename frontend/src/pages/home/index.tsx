import Chat from "@/components/Chat";
import "./index.scss";
import "react-calendar/dist/Calendar.css";
import SideBar from "@/components/SideBar";

const Home = () => {
  return (
    <div className="home">
      <SideBar></SideBar>
      <div className="main">
        <Chat></Chat>
      </div>
    </div>
  );
};

export default Home;
