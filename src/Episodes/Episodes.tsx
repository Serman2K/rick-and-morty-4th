import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Leftside from "../Main/Leftside";
import "./Episodes.css";

const EPISODES_QUERY = gql`
  {
    episodes(filter: { episode: "S04" }) {
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
    (episode: any, i: number) => (
      <div className="episode__element" key={episode.id}>
        <div className="episode__right__Margin">
          <p className="episode__num">{episode.episode}</p>
        </div>
        <section className="episode__title">
          <div className="episode__left__Margin">
            <p
              className={"primary__info" + ((i + 1) % 2 === 0 ? " even" : "")}
              onClick={() =>
                navigate("/characters", { state: { key: episode.id } })
              }
            >
              {episode.name}
            </p>
          </div>
          <div className="episode__left__Margin">
            <span className="secondary__info">{episode.air_date}</span>
          </div>
        </section>
      </div>
    )
  );

  return (
    <section className="main__content">
      <Leftside season={data.episodes.results[0].episode[2]} />
      <section className="episode__list">{episodeElements}</section>
    </section>
  );
}

export default Episodes;
