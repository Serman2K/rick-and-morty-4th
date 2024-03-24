import { useQuery, gql } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import Leftside from "../LeftSide/Leftside";
import Arrow from "../assets/arrow.png";
import "./CharacterDetails.css"

function CharacterDetails() {
  let location = useLocation();
  let navigate = useNavigate();

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
    <>
      <nav className="button__space">
        <button className="button__back" onClick={() => navigate(-1)}>
          <img className="back__arrow" src={Arrow} />
          Characters
        </button>
      </nav>
      <section className="main__content">
        <Leftside name={data.character.name} url={data.character.image} />
        <ul className="details__list">
          <li className="primary__info  cursor">{data.character.status}</li>
          <li className="secondary__info">Status</li>
          <li className="line"></li>
          <li className="primary__info even cursor">{data.character.species}</li>
          <li className="secondary__info">Species</li>
          <li className="line"></li>
          <li className="primary__info cursor">
            {data.character.type === "" ? "-" : data.character.type}
          </li>
          <li className="secondary__info">Type</li>
          <li className="line"></li>
          <li className="primary__info even cursor">{data.character.gender}</li>
          <li className="secondary__info">Gender</li>
          <li className="line"></li>
          <li className="primary__info cursor">{data.character.origin.name}</li>
          <li className="secondary__info">Origin</li>
          <li className="line"></li>
          <li className="primary__info even cursor">{data.character.location.name}</li>
          <li className="secondary__info">Last known location</li>
        </ul>
      </section>
    </>
  );
}

export default CharacterDetails;
