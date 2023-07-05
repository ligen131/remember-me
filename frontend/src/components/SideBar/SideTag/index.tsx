import "./index.scss";

interface TagProps {
  callback: (tag: number, event: any) => void;
  tag: number;
}

const SideTag = (props: TagProps) => {
  const { callback, tag } = props;

  return <div className="side-tag" onClick={callback.bind(this, tag)}></div>;
};

export default SideTag;
