import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_POST_INVENTORY } from "../../queries/Queries";
import { Search } from "../Search";
import { RecoilRoot } from "recoil";

const mocks1 = [
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
              _id: "63525282dcb92aeaf8be3d55",
              id: 1,
              title: "His mother had always taught him",
              body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
              userId: 9,
              tags: ["history", "american", "crime"],
              reactions: 17,
            },
            {
              _id: "63525282dcb92aeaf8be3d68",
              id: 20,
              title: "He couldn't remember exactly where he had read it",
              body: "He couldn't remember exactly where he had read it, but he was sure that he had. The fact that she didn't believe him was quite frustrating as he began to search the Internet to find the article. It wasn't as if it was something that seemed impossible. Yet she insisted on always seeing the source whenever he stated a fact.",
              userId: 38,
              tags: ["french", "classic"],
              reactions: 10,
            },
            {
              _id: "63525282dcb92aeaf8be3d5c",
              id: 8,
              title: "One can cook on and with an open fire.",
              body: "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it.",
              userId: 31,
              tags: ["american", "english"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d69",
              id: 21,
              title: "He wandered down the stairs and into the basement",
              body: "He wandered down the stairs and into the basement. The damp, musty smell of unuse hung in the air. A single, small window let in a glimmer of light, but this simply made the shadows in the basement deeper. He inhaled deeply and looked around at a mess that had been accumulating for over 25 years. He was positive that this was the place he wanted to live.",
              userId: 37,
              tags: ["french", "american"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d7b",
              id: 39,
              title: "It was so great to hear from you today",
              body: '"It was so great to hear from you today and it was such weird timing," he said. "This is going to sound funny and a little strange, but you were in a dream I had just a couple of days ago. I\'d love to get together and tell you about it if you\'re up for a cup of coffee," he continued, laying the trap he\'d been planning for years.',
              userId: 36,
              tags: ["french", "magical", "american"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d81",
              id: 45,
              title: "The red line moved across the page.",
              body: "The red line moved across the page. With each millimeter it advanced forward, something changed in the room. The actual change taking place was difficult to perceive, but the change was real. The red line continued relentlessly across the page and the room would never be the same.",
              userId: 12,
              tags: ["love", "american"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d84",
              id: 48,
              title: "Trees. It was something about the trees.",
              body: "Trees. It was something about the trees. The way they swayed with the wind in unison. The way they shaded the area around them. The sounds of their leaves in the wind and the creaks from the branches as they sway, The trees were making a statement that I just couldn't understand.",
              userId: 18,
              tags: ["love", "fiction", "crime"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d8c",
              id: 56,
              title: "The house was located at the top of the hill",
              body: "The house was located at the top of the hill at the end of a winding road. It wasn't obvious that the house was there, but everyone in town knew that it existed. They were just all too afraid to ever go and see it in person.",
              userId: 28,
              tags: ["classic", "french", "history"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d8e",
              id: 58,
              title: "Balloons are pretty and come in different colors",
              body: "Balloons are pretty and come in different colors, different shapes, different sizes, and they can even adjust sizes as needed. But don't make them too big or they might just pop, and then bye-bye balloon. It'll be gone and lost for the rest of mankind. They can serve a variety of purposes, from decorating to water balloon wars. You just have to use your head to think a little bit about what to do with them.",
              userId: 3,
              tags: ["american", "crime", "magical"],
              reactions: 9,
            },
            {
              _id: "63525282dcb92aeaf8be3d9c",
              id: 72,
              title: "The words hadn't flowed from his fingers",
              body: "The words hadn't flowed from his fingers for the past few weeks. He never imagined he'd find himself with writer's block, but here he sat with a blank screen in front of him.",
              userId: 44,
              tags: ["crime", "history", "classic"],
              reactions: 9,
            },
          ],
          count: 150,
        },
      },
    },
  },
];

const mocks2 = [
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
    result: undefined,
  },
];

it("Loads without error, and presents the data on page", async () => {
  render(
    <RecoilRoot>
      <MockedProvider mocks={mocks1} addTypename={false}>
        <Search />
      </MockedProvider>
    </RecoilRoot>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(
    await screen.findByText("His mother had always taught him")
  ).toBeInTheDocument();
});

it("returns error message if the dataset is not available", async () => {
  render(
    <RecoilRoot>
      <MockedProvider mocks={mocks2} addTypename={false}>
        <Search />
      </MockedProvider>
    </RecoilRoot>
  );
  expect(await screen.findByText("No stories available")).toBeInTheDocument();
});
