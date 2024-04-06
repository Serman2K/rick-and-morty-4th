import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LeftSideEpisodes from "./LeftSideEpisodes";
import EpisodeInterface from "./EpisodeInterface";
import "./Episodes.css";

export const EPISODES_QUERY = gql`
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

  const episodeElements = data.episodes.results.map(
    (episode: EpisodeInterface, i: number) => (
      <aside className="episode__element" key={episode.id}>
        <div className="episode__right__Margin">
          <p className="episode__num">{episode.episode}</p>
        </div>
        <section className="episode__title">
          <div className="episode__left__Margin">
            <p
              className={"primary__info" + ((i + 1) % 2 === 0 ? " even" : "")}
              onClick={() => navigate(`episode/${episode.id}/characters`)}
            >
              {episode.name}
            </p>{" "}
          </div>
          <div className="episode__left__Margin">
            <span className="secondary__info">{episode.air_date}</span>{" "}
          </div>
        </section>
        <div className={i + 1 < data.episodes.info.count ? "mobile__view__line" : ""}></div>{" "}
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
