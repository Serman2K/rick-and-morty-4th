import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Characters, { CHARACTERS_QUERY } from "../Characters/Characters";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({
    episodeId: "32",
  }),
}));

describe("Characters component", () => {
  const mockCharacters = {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        episodeId: "32",
      },
    },
    result: {
      data: {
        episode: {
          episode: "S04E01",
          characters: [
            {
              id: "1",
              name: "Rick Sanchez",
              species: "Human",
            },
            {
              id: "2",
              name: "Morty Smith",
              species: "Human",
            },
          ],
        },
      },
    },
  };

  test("Render characters without errors", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={[mockCharacters]} addTypename={false}>
          <Characters />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();

      const species = screen.getAllByText(/Human/i);
      species.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
  });

  test("Navigate to character details page", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <MockedProvider mocks={[mockCharacters]} addTypename={false}>
          <Characters />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/Rick Sanchez/i));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/episode/32/character/1/details");
    });
  });

  test("Check back button", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <MockedProvider mocks={[mockCharacters]} addTypename={false}>
          <Characters />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Episodes")).toBeInTheDocument();
    });
    userEvent.click(screen.getByText("Episodes"));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
