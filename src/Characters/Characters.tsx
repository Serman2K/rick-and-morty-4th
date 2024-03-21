import { useQuery, gql } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import Leftside from "../Main/Leftside";
import Arrow from "../assets/arrow.png";

function Characters() {
  const navigate = useNavigate();
  let location = useLocation();
  const CHARACTERS_QUERY = gql`
        {
            episode(id: ${location.state.key}) {
              episode
                characters {
                    id
                    name
                    species
                }
            }
        }
        `;

  const { data, loading, error } = useQuery(CHARACTERS_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  const characterElements = data.episode.characters.map(
    (character: any, i: number) => (
      <article key={character.id}>
        <li
          className={"primary__info" + ((i + 1) % 2 === 0 ? " even" : "")}
          onClick={() => navigate("/details", { state: { key: character.id } })}
        >
          {character.name}
        </li>
        <li className="secondary__info">{character.species}</li>
      </article>
    )
  );

  return (
    <>
      <nav className="button__space">
        <button className="button__back" onClick={() => navigate(-1)}>
          <img className="back__arrow" src={Arrow} />
          Episodes
        </button>
      </nav>
      <section className="main__content">
        <Leftside
          season={data.episode.episode[2]}
          episode={
            (data.episode.episode[4] === "1" ? "1" : "") +
            data.episode.episode[5]
          }
        />
        <ul className="characters__list">{characterElements}</ul>
      </section>
    </>
  );
}

export default Characters;
