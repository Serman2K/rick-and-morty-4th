import Image from "../assets/image.png";
import "./LeftSideCharacters.css"

interface Characters {
  episode: string;
  season: string;
}

export default function LeftSideCharacters(props: Characters) {
  return (
    <section className="content__left__Margin">
      <div className="characters__title">
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
    </section>
  );
}
