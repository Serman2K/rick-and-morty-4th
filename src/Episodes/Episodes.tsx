import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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
            className={"primary__info" + ((i+1) % 2 === 0 ? " even" : "")}
            onClick={() =>
              navigate("/characters", { state: { key: episode.id } })
            }
          >
            {episode.name}
          </span>
          <br />
          <span className="secondary__info">{episode.air_date}</span>
        </td>
      </tr>
    )
  );

  return <table className="episodes--table">{episodeElements}</table>;
}

export default Episodes;
