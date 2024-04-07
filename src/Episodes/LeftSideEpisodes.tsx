import Image from "../assets/image.png";
import "./LeftSideEpisodes.css"

interface Episode {
  season: string;
}

export default function Leftside(props: Episode) {
  return (
    <section className="leftSide__episodes__margin">
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
    </section>
  );
}
