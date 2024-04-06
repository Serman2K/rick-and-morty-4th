import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import Episodes, { EPISODES_QUERY } from "../Episodes/Episodes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Episodes component", () => {
  const mockEpisodes = {
    request: {
      query: EPISODES_QUERY,
    },
    result: {
      data: {
        episodes: {
          info: { count: 2 },
          results: [
            {
              id: "32",
              episode: "S04E01",
              name: "Edge of Tomorty: Rick, Die, Rickpeat",
              air_date: "November 10, 2019",
            },
            {
              id: "33",
              episode: "S04E02",
              name: "The Old Man and the Seat",
              air_date: "November 17, 2019",
            },
          ],
        },
      },
    },
  };

  test("Render episodes without errors", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={[mockEpisodes]} addTypename={false}>
          <Episodes />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText("Edge of Tomorty: Rick, Die, Rickpeat")
      ).toBeInTheDocument();
      expect(screen.getByText("The Old Man and the Seat")).toBeInTheDocument();
      expect(screen.getByText("November 10, 2019")).toBeInTheDocument();
      expect(screen.getByText("November 17, 2019")).toBeInTheDocument();
    });
  });

  test("Navigate to episode characters page", async () => {
    const navigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <MockedProvider mocks={[mockEpisodes]} addTypename={false}>
          <Episodes />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/The Old Man and the Seat/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/The Old Man and the Seat/i));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("episode/33/characters");
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
