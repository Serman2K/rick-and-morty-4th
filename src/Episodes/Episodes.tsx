import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LeftSideEpisodes from "./LeftSideEpisodes";
import "./Episodes.css";

const EPISODES_QUERY = gql`
  {
    episodes(filter: { episode: "S04" }) {
      info {
        count
      }
      results {
        id
        episode
        name
        air_date
      }
    }
  }
`;

function Episodes() {
  const { data, loading, error } = useQuery(EPISODES_QUERY);
  const navigate = useNavigate();

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  interface Episode {
    id: string;
    episode: string;
    name: string;
    air_date: string;
  }

  const episodeElements = data.episodes.results.map(
    (episode: Episode, i: number) => (
      <aside className="episode__element" key={episode.id}>
        <div className="episode__right__Margin">
          <p className="episode__num">{episode.episode}</p> {/*S0XEYZ*/}
        </div>
        <section className="episode__title">
          <div className="episode__left__Margin">
            <p
              className={"primary__info" + ((i + 1) % 2 === 0 ? " even" : "")}
              onClick={() => navigate(`/characters/${episode.id}`)}
            >
              {episode.name}
            </p>{" "}
            {/*Episode Title*/}
          </div>
          <div className="episode__left__Margin">
            <span className="secondary__info">{episode.air_date}</span>{" "}
            {/*Episode Date*/}
          </div>
        </section>
        <div className={i + 1 < data.episodes.info.count ? "line" : ""}></div>{" "}
        {/*Only for mobile view*/}
      </aside>
    )
  );

  return (
    <section className="main__content">
      <LeftSideEpisodes season={data.episodes.results[0].episode[2]} />
      <section className="episode__list">{episodeElements}</section>
    </section>
  );
}

export default Episodes;
