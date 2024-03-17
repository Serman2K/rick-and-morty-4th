import { useLocation } from "react-router-dom";
import Image from "../assets/image.png";

export default function Leftside(props: any) {
  if (useLocation().pathname === "/")
    return (
      <div>
        <p className="main__title">
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
          <br />
          season of the series
          <br />
          <span className="cyan">Rick and Morty</span>
        </p>

        <img src={Image} className="image" />
      </div>
    );

  if (useLocation().pathname === "/characters")
    return (
      <div>
        <p className="main__title">
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
          <br />
          episode of the <b>
            {props.season +
              (props.season === "1"
                ? "st"
                : props.season === "2"
                ? "nd"
                : props.season === "3"
                ? "rd"
                : "th")}
          </b><br />
          season of the series
          <br />
          <span className="cyan">Rick and Morty</span>
        </p>

        <img src={Image} className="image" />
      </div>
    )

    if (useLocation().pathname === "/details")
    return (
<div>
    <p>{props.name}</p>
    <img src={props.url} className="image" />
</div>
)
}
