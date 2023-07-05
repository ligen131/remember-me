import { Post } from "@/type";
import "./index.scss";

interface DetailProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  post: Post;
}

const Detail = (props: DetailProps) => {
  const { isShow, setIsShow, post } = props;

  return (
    <div className={isShow ? "detail" : "hidden"}>
      <div className="mask" onClick={setIsShow.bind(this, false)}></div>
      <div className="detail-box">
        <div className="left">
          <img src={post.image_url}></img>
        </div>
        <div className="right">
          <p className="title">{post.title}</p>
          <p className="content">{post.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
