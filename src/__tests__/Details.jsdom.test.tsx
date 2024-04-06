import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import CharacterDetails, { DETAILS_QUERY } from "../CharacterDetails/CharacterDetails";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

describe("Details component", () => {
    const mockDetails = {
        request: {
            query: DETAILS_QUERY,
        },
        result: {
            data: {
                character: {
                    id: "1",
                    name: "Rick Sanchez",
                    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                    status: "Alive",
                    species: "Human",
                    type: "",
                    gender: "Male",
                    origin: {
                        name: "Earth (C-137)"
                    },
                    location: {
                        name: "Citadel of Ricks"
                    }
                }
            }
        }
    };

    test("Render character details without errors", async () => {
        render(
            <MemoryRouter initialEntries={["/episode/32/character/1/details"]}>
                <MockedProvider mocks={[mockDetails]} addTypename={false}>
                        <CharacterDetails />
                </MockedProvider>
            </MemoryRouter>
        );

        expect(await screen.findByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
            expect(screen.getByText("Alive")).toBeInTheDocument();
            expect(screen.getByText("Human")).toBeInTheDocument();
            expect(screen.getByText("Male")).toBeInTheDocument();
            expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
            expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
        });
    });

    test("Check back button", async () => {
        const navigate = jest.fn();
        jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigate);

        render(
            <MemoryRouter initialEntries={["/episode/32/character/1/details"]}>
                <MockedProvider mocks={[mockDetails]} addTypename={false}>
                        <CharacterDetails />
                </MockedProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Characters")).toBeInTheDocument();
        });
        userEvent.click(screen.getByText("Characters"));

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith("/episode/undefined/characters");
        })
    })

    afterEach(() => {
        jest.resetAllMocks();
    })
})