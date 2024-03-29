import { useQuery, gql } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import LeftSideDetails from "./LeftSideDetails.tsx";
import Arrow from "../assets/arrow.png";
import "./CharacterDetails.css";

function CharacterDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const DETAILS_QUERY = gql`
    query GetCharacterDetails($id: ID!) {
      character(id: $id) {
        id
        name
        image
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(DETAILS_QUERY, {
    variables: { id: location.state.key },
  });

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <nav className="button__space">
        <button className="button__back" onClick={() => navigate(-1)}>
          <img className="button__arrow" src={Arrow} />
          Characters
        </button>
      </nav>
      <section className="main__content">
        <LeftSideDetails
          name={data.character.name}
          url={data.character.image}
        />
        <dl className="details__list">
          <div>
            <dt className="primary__info  cursor">{data.character.status}</dt>
            <dd className="secondary__info">Status</dd>
          </div>
          <div className="line"></div> {/*Only for mobile view*/}
          <div>
            <dt className="primary__info even cursor">
              {data.character.species}
            </dt>
            <dd className="secondary__info">Species</dd>
          </div>
          <div className="line"></div> {/*Only for mobile view*/}
          <div>
            <dt className="primary__info cursor">
              {data.character.type === "" ? "-" : data.character.type}
            </dt>
            <dd className="secondary__info">Type</dd>
          </div>
          <div className="line"></div> {/*Only for mobile view*/}
          <div>
            <dt className="primary__info even cursor">
              {data.character.gender}
            </dt>
            <dd className="secondary__info">Gender</dd>
          </div>
          <div className="line"></div> {/*Only for mobile view*/}
          <div>
            <dt className="primary__info cursor">
              {data.character.origin.name}
            </dt>
            <dd className="secondary__info">Origin</dd>
          </div>
          <div className="line"></div> {/*Only for mobile view*/}
          <div>
            <dt className="primary__info even cursor">
              {data.character.location.name}
            </dt>
            <dd className="secondary__info">Last known location</dd>
          </div>
        </dl>
      </section>
    </>
  );
}

export default CharacterDetails;
