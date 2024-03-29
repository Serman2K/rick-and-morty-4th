import { useQuery, gql } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import LeftSideCharacters from "./LeftSideCharacters";
import Arrow from "../assets/arrow.png";
import "./Character.css";

function Characters() {
  const location = useLocation();
  const navigate = useNavigate();

  const CHARACTERS_QUERY = gql`
    query GetCharacters($id: ID!) {
      episode(id: $id) {
        episode
        characters {
          id
          name
          species
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(CHARACTERS_QUERY, {
    variables: { id: location.state.key },
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  interface Character {
    id: string;
    name: string;
    species: string;
  }

  const characterElements = data.episode.characters.map(
    (character: Character, i: number) => (
      <li key={character.id}>
        <p
          className={"primary__info" + ((i + 1) % 2 === 0 ? " even" : "")}
          onClick={() => navigate("/details", { state: { key: character.id } })}
        >
          {character.name}
        </p>
        <p className="secondary__info">{character.species}</p>
        <div className={i + 1 < data.episode.characters.length ? "line" : ""}></div> {/*Only for mobile view*/}
      </li>
    )
  );

  return (
    <>
      <nav className="button__space">
        <button className="button__back" onClick={() => navigate(-1)}>
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
        /> {/*This part sends episode number information, the episode number format is: S0XE0Y, in the extreme case the episode may exceed 9, we check this condition.*/}
        <ul className="characters__list">{characterElements}</ul>
      </section>
    </>
  );
}

export default Characters;
