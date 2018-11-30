import { render, cleanup } from "react-testing-library";
import PeopleList from "./PeopleList";
import "react-testing-library/cleanup-after-each";
import React from "react";

const people = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male"
  },
  {
    name: "C-3PO",
    height: "167",
    mass: "75",
    hair_color: "n/a",
    skin_color: "gold",
    eye_color: "yellow",
    birth_year: "112BBY",
    gender: "n/a"
  },
  {
    name: "R2-D2",
    height: "96",
    mass: "32",
    hair_color: "n/a",
    skin_color: "white, blue",
    eye_color: "red",
    birth_year: "33BBY",
    gender: "n/a"
  },
  {
    name: "Darth Vader",
    height: "202",
    mass: "136",
    hair_color: "none",
    skin_color: "white",
    eye_color: "yellow",
    birth_year: "41.9BBY",
    gender: "male"
  }
];

describe("PeopleList", () => {
  afterEach(cleanup);

  describe("when the list is empty", () => {
    it("renders an empty div", () => {
      const { container } = render(<PeopleList people={[]} />);
      expect(container.innerHTML).toBe("");
    });

    it("renders a list of n elements", () => {
      const { getAllByText } = render(<PeopleList people={people} />);

      const res = getAllByText(/(Luke Skywalker|C-3PO|R2-D2|Darth Vader)/);

      expect(res.length).toBe(4);
    });
  });
});
