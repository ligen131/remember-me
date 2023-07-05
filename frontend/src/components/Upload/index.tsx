import "./index.scss";
import { useRef, useState } from "react";
import uploadImg from "@/network/api/uploadImg";
import uploadIcon from "@assets/image.png";
import newPost from "@/network/api/newPost";

interface UploadProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

const Upload = (props: UploadProps) => {
  const { isShow, setIsShow } = props;
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onTextChange = (e: any) => {
    setText(e.target.value);
  };

  const uploadInput: any = useRef();

  const chooseImg = async () => {
    uploadInput.current.click();
  };

  const uploadHandler = (e: any) => {
    let file = e.target.files[0];
    uploadImg(file).then((res: string | undefined) => {
      console.log(res);
      if (!res) return;
      setImg(res);
    });
  };

  const postHandler = () => {
    newPost({
      image_url: img,
      title,
      text,
      user_id: 1,
      month: 7,
      year: 2023,
    }).then((res) => {
      if (!res) alert("上传失败");
      else {
        window.location.reload();
      }
    });
  };

  return (
    <div className={isShow ? "upload" : "hidden"}>
      <div className="mask" onClick={setIsShow.bind(this, false)}></div>
      <input
        className="img-input"
        ref={uploadInput}
        type="file"
        accept="image/*"
        onChange={uploadHandler.bind(this)}
      />
      <div className="upload-box">
        <div className="title">
          <input placeholder="标题" onChange={onTitleChange}></input>
        </div>
        <div className="content">
          <textarea placeholder="内容" onChange={onTextChange}></textarea>
        </div>
        <div className="img">
          <img src={img}></img>
        </div>
        <div className="bottom">
          <img
            className="btn-upload"
            src={uploadIcon}
            onClick={chooseImg.bind(this)}
          ></img>
          <div className="spacer"></div>
          <div className="btn-send" onClick={postHandler.bind(this)}>
            <p>上传</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
