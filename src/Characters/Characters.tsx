import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

function Characters() {
  const navigate = useNavigate();
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.state.key);
  });
  const CHARACTERS_QUERY = gql`
        {
            episode(id: ${location.state.key}) {
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

  const characterElements = data.episode.characters.map((character: any) => (
    <>
      <dt
        onClick={() => navigate("/details", { state: { key: character.id } })}
      >
        {character.name}
      </dt>
      <dd>{character.species}</dd>
    </>
  ));

  return <dl>{characterElements}</dl>;
}

export default Characters;
