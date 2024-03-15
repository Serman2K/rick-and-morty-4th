import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
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
      <tr key={episode.id}>
        <td className="episode--num">{episode.episode}</td>
        <td>
          <span
            className={"episode--title " + (i % 2 === 0 ? "blue" : "green")}
            onClick={() =>
              navigate("/characters", { state: { key: episode.id } })
            }
          >
            {episode.name}
          </span>
          <br />
          <span className="episode--date">{episode.air_date}</span>
        </td>
      </tr>
    )
  );

  return <table className="episodes--table">{episodeElements}</table>;
}

export default Episodes;
