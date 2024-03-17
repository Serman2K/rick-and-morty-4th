import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Leftside from "../Main/Leftside";

function CharacterDetails() {
  let location = useLocation();

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

  return (
    <div className="main__content">
      <Leftside name={data.character.name} url={data.character.image}/>
    <ul>
      <li className="primary__info">{data.character.status}</li>
      <li className="secondary__info">Status</li>
      <li className="primary__info even">{data.character.species}</li>
      <li className="secondary__info">Species</li>
      <li className="primary__info">
        {data.character.type === "" ? "-" : data.character.type}
      </li>
      <li className="secondary__info">Type</li>
      <li className="primary__info even">{data.character.gender}</li>
      <li className="secondary__info">Gender</li>
      <li className="primary__info">{data.character.origin.name}</li>
      <li className="secondary__info">Origin</li>
      <li className="primary__info even">{data.character.location.name}</li>
      <li className="secondary__info">Last known location</li>
    </ul>
    </div>
  )
}

export default CharacterDetails;
