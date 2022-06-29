import { NoteState } from "types/states"

const mockNotes = [
  {
    id: 1,
    title: "Books to read before I go to sleep",
    contents:
      "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    color: "sky",
  },
  {
    id: 2,
    title: "Shoplist",
    contents:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    color: "emerald",
  },
  {
    id: 3,
    title: "Homeworks",
    contents: "There are many variations of passages of Lorem Ipsum available",
    color: "pink",
  },
  // {
  //   id: 4,
  //   title: "Things to pack",
  //   contents:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  //   color: "amber",
  // },
  // {
  //   id: 5,
  //   title: "Things to buy",
  //   contents:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  //   color: "slate",
  // },
  // {
  //   id: "6",
  //   title: "School work",
  //   contents: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  //   color: "slate",
  // },
  // {
  //   id: "7",
  //   title: "Books to read before I go to sleep",
  //   contents:
  //     "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   color: "sky",
  // },
  // {
  //   id: "8",
  //   title: "Shoplist",
  //   contents:
  //     "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  //   color: "emerald",
  // },
  // {
  //   id: "9",
  //   title: "Homeworks",
  //   contents: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  //   color: "pink",
  // },
] as NoteState[]

export default mockNotes
