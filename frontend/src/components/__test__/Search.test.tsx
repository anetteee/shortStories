import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_POST_INVENTORY } from "../../queries/Queries";
import { Search } from "../Search";
import { RecoilRoot } from "recoil";

const mocks = [
  {
    request: {
      query: GET_POST_INVENTORY,
      variables: {
        tag: "",
        limit: 10,
        offset: 0,
        keepPreviousData: true,
        input: "",
        sortBy: "",
      },
    },
    result: {
      data: {
        getPost: {
          posts: [
            {
              _id: "63525282dcb92aeaf8be3d59",
              id: 5,
              title: "Hopes and dreams were dashed that day.",
              body: "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
              userId: 41,
              tags: ["crime", "mystery", "love"],
              reactions: 4,
            },
          ],
          count: 1,
        },
      },
    },
  },
];

it("renders without error", async () => {
  render(
    <RecoilRoot>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Search />
      </MockedProvider>
    </RecoilRoot>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(
    await screen.findByText("Hopes and dreams were dashed that day.")
  ).toBeInTheDocument();
});
