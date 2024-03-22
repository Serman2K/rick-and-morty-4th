import { useLocation } from "react-router-dom";
import Image from "../assets/image.png";
import "./LeftSide.css"

export default function Leftside(props: any) {
  if (useLocation().pathname === "/")
    return (
      <div className="leftSide__episodes__margin">
        <div className="main__title">
          <p>
            Episodes of the{" "}
            <b>
              {props.season +
                (props.season === "1"
                  ? "st"
                  : props.season === "2"
                  ? "nd"
                  : props.season === "3"
                  ? "rd"
                  : "th")}
            </b>
          </p>
          <p>season of the series</p>
          <span className="cyan">Rick and Morty</span>
        </div>

        <img src={Image} className="image" />
      </div>
    );

  if (useLocation().pathname === "/characters")
    return (
      <div className="content__left__Margin">
        <div className="main__title">
          <p>
            Characters of the{" "}
            <b>
              {props.episode +
                (props.episode === "1"
                  ? "st"
                  : props.episode === "2"
                  ? "nd"
                  : props.episode === "3"
                  ? "rd"
                  : "th")}
            </b>
          </p>
          <p>
            episode of the{" "}
            <b>
              {props.season +
                (props.season === "1"
                  ? "st"
                  : props.season === "2"
                  ? "nd"
                  : props.season === "3"
                  ? "rd"
                  : "th")}
            </b>
          </p>
          <p>season of the series</p>
          <span className="cyan">Rick and Morty</span>
        </div>

        <img src={Image} className="image" />
      </div>
    );

  if (useLocation().pathname === "/details")
    return (
      <div className="content__left__Margin">
        <h1 className="details__name cyan">{props.name}</h1>
        <img src={props.url} className="details__image" />
      </div>
    );
}
