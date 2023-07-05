import Detail from "@/components/Detail";
import "./index.scss";
import Light from "@/components/Light";
import { useState, useEffect } from "react";
import uploadImg from "@assets/upload.svg";
import logoImg from "@assets/logo.jpg";
import chatImg from "@assets/chat.svg";
import relationshipImg from "@assets/relationship.svg";
import { useNavigate } from "react-router-dom";
import Upload from "@/components/Upload";
import { LightStyle, Post } from "@/type";
import getPost from "@/network/api/getPost";
import randomStyle from "@/utils/randomStyle";
import getRelationship from "@/network/api/getRelationship";
import Relationship from "@/components/Relationship";

const Remember = () => {
  const navigate = useNavigate();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowUpload, setIsShowUpload] = useState(false);
  const [isShowRelationship, setIsShowRelationship] = useState(false);
  const [relationshipUrl, setRelationshipUrl] = useState("");

  const [post, setPost] = useState<Post[] | undefined>(undefined);
  const [active, setActive] = useState(0);

  const [lightStyle, setLightStyle] = useState<LightStyle[] | undefined>(
    undefined
  );

  const lightHandler = (index: number) => {
    setActive(index);
    setIsShowDetail(true);
  };

  const chatHandler = () => {
    navigate("/chat");
  };

  const relateHandler = () => {
    getRelationship().then((res) => {
      if (!res) return;
      setRelationshipUrl(res.image_url);
      setIsShowRelationship(true);
    });
  };

  useEffect(() => {
    if (post) return;
    getPost().then((res) => {
      console.log(res);
      if (!res) return;
      setPost(res.posts);
      setLightStyle(randomStyle(res.posts.length));
      console.log(lightStyle);
    });
  }, []);

  if (post && lightStyle)
    return (
      <div className="remember">
        <Detail
          isShow={isShowDetail}
          setIsShow={setIsShowDetail}
          post={post![active]}
        ></Detail>
        <Upload isShow={isShowUpload} setIsShow={setIsShowUpload}></Upload>
        <Relationship
          isShow={isShowRelationship}
          setIsShow={setIsShowRelationship}
          img={relationshipUrl}
        ></Relationship>
        <div className="logo">
          <img src={logoImg}></img>
        </div>
        <div className="light-container">
          {post.map((item, index) => {
            return (
              <Light
                onClick={lightHandler.bind(this, index)}
                img={item.image_url}
                style={lightStyle![index]}
              ></Light>
            );
          })}
        </div>
        <div className="btn-list">
          <div
            className="btn-upload"
            onClick={setIsShowUpload.bind(this, true)}
          >
            <img src={uploadImg}></img>
          </div>
          <div className="btn-chat" onClick={chatHandler}>
            <img src={chatImg}></img>
          </div>
          <div className="btn-relate" onClick={relateHandler}>
            <img src={relationshipImg}></img>
          </div>
        </div>
      </div>
    );
};

export default Remember;
