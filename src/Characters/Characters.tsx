import { useQuery, gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import LeftSideCharacters from "./LeftSideCharacters";
import Arrow from "../assets/arrow.png";
import CharacterInterface from "./CharacterInterface";
import "./Characters.css";

export const CHARACTERS_QUERY = gql`
query GetCharacters($episodeId: ID!) {
  episode(id: $episodeId) {
    episode
    characters {
      id
      name
      species
    }
  }
}
`;

function Characters() {
  let { episodeId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(CHARACTERS_QUERY, {
    variables: { episodeId },
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const characterElements = data.episode.characters.map(
    (character: CharacterInterface, i: number) => (
      <li key={character.id}>
        <p
          className={"primary__info" + ((i + 1) % 2 === 0 ? " even" : "")}
          onClick={() => navigate(`/episode/${episodeId}/character/${character.id}/details`)}
        >
          {character.name}
        </p>
        <p className="secondary__info">{character.species}</p>
        <div
          className={i + 1 < data.episode.characters.length ? "mobile__view__line" : ""}
        ></div>{" "}
      </li>
    )
  );

  return (
    <>
      <nav className="button__space">
        <button className="button__back" onClick={() => navigate("/")}>
          <img className="button__arrow" src={Arrow} />
          Episodes
        </button>
      </nav>
      <section className="main__content">
        <LeftSideCharacters
          season={data.episode.episode[2]}
          episode={
            (data.episode.episode[4] === "1" ? "1" : "") +
            data.episode.episode[5]
          }
        />{" "}
        {/*Check if the episode number exceeds 9*/}
        <ul className="characters__list">{characterElements}</ul>
      </section>
    </>
  );
}

export default Characters;
