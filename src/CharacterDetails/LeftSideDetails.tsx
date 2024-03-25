import "./LeftSideDetails.css";

interface Details {
  name: string;
  url: string;
}

export default function LeftSideDetails(props: Details) {
  return (
    <div className="content__left__Margin">
      <h1 className="details__name cyan">{props.name}</h1> {/*Character's Name*/}
      <img src={props.url} className="details__image" /> {/*Character's Picture*/}
    </div>
  );
}
