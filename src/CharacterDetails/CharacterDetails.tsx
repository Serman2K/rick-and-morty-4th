import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";

function CharacterDetails() {
  let location = useLocation();
  console.log(location.state.key + "f");
  React.useEffect(() => {
    console.log(location.state.key);
  });
  const DETAILS_QUERY = gql`
  {
    character(id: ${location.state.key}) {
      id,
      name,
      image,
      status,
      species,
      type,
      gender,
      origin{name},
      location{name}
    }
  }
`;

  const { data, loading, error } = useQuery(DETAILS_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;
  console.log()

  return (
    <dl>
      <>
        <dt>{data.character.name}</dt>
        <dd>{data.character.species} </dd>
      </>
    </dl>
  );
}

export default CharacterDetails;
