import { useState } from "react";
import SideTag from "./SideTag";
import "./index.scss";

const SideBar = () => {
  const [isShow, setIsShow] = useState(false);
  const [tag, setTag] = useState<number | undefined>(undefined);

  const tagHandler = (_tag: number) => {
    if (tag === _tag) {
      setIsShow(false);
      setTag(undefined);
    } else {
      setTag(_tag);
      setIsShow(true);
    }
  };

  return (
    <div className={isShow ? "side-bar show" : "side-bar"}>
      <div className="side"></div>
      <div className="tag-list">
        <SideTag callback={tagHandler} tag={0}></SideTag>
        <SideTag callback={tagHandler} tag={1}></SideTag>
      </div>
    </div>
  );
};

export default SideBar;
