import "./index.scss";

interface RelationshipProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  img: string;
}

const Relationship = (props: RelationshipProps) => {
  const { isShow, setIsShow, img } = props;

  return (
    <div className={isShow ? "relationship" : "hidden"}>
      <div className="mask" onClick={setIsShow.bind(this, false)}></div>
      <div className="relationship-box">
        <img src={img}></img>
      </div>
    </div>
  );
};

export default Relationship;
