import Detail from "@/components/Detail";
import "./index.scss";
import Light from "@/components/Light";
import { useState, useEffect } from "react";
import uploadImg from "@assets/upload.svg";
import chatImg from "@assets/chat.svg";
import { useNavigate } from "react-router-dom";
import Upload from "@/components/Upload";
import { Post } from "@/type";
import getPost from "@/network/api/getPost";

const Remember = () => {
  const navigate = useNavigate();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowUpload, setIsShowUpload] = useState(false);

  const [post, setPost] = useState<Post[] | undefined>(undefined);

  const lightHandler = () => {
    setIsShowDetail(true);
  };

  const chatHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    if (post) return;
    getPost().then((res) => {
      console.log(res);
      if (!res) return;
      setPost(res.posts);
    });
  }, []);

  return (
    <div className="remember">
      <Detail isShow={isShowDetail} setIsShow={setIsShowDetail}></Detail>
      <Upload isShow={isShowUpload} setIsShow={setIsShowUpload}></Upload>
      <Light onClick={lightHandler}></Light>
      <div className="btn-list">
        <div className="btn-upload" onClick={setIsShowUpload.bind(this, true)}>
          <img src={uploadImg}></img>
        </div>
        <div className="btn-chat" onClick={chatHandler}>
          <img src={chatImg}></img>
        </div>
      </div>
    </div>
  );
};

export default Remember;
