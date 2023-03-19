import React from "react";
import { BrowserRouter } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "../App";
import Home from "../Home";
import AddRecipePage from "../AddRecipePage";

// Making sure that all 3 cards on the home page are rendered correctly
describe("Home component - testing that cards are rendered", () => {
  test("Exactly 3 headings of 3rd level exist", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles.length).toBe(3);
  });
  test("Heading 1 is rendered correctly", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const title1 = screen.getByText("Browse recipes");
    expect(title1).toBeInTheDocument();
  });
  test("Heading 2 is rendered correctly", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const title2 = screen.getByText("Add your own recipe");
    expect(title2).toBeInTheDocument();
  });
  test("Heading 3 is rendered correctly", () => {
    render(<Home />, { wrapper: BrowserRouter });
    const title3 = screen.getByText("Want to know more?");
    expect(title3).toBeInTheDocument();
  });
});

// Snapshot test
describe("Snapshot test - App front page", () => {
  test("App matches Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});

// Navigation test - mimicking user navigating the website
describe("Navigation test", () => {
  test("Navigate to about page, rendered correctly", async () => {
    render(<App />);
    const user = userEvent.setup();
    // Verifying page content for the About page
    await user.click(screen.getByText(/About/i));
    expect(screen.getByText(/About TasteIT/i)).toBeInTheDocument();
  });

  test("Navigate to recipes page, rendered correctly", async () => {
    render(<App />);
    const user = userEvent.setup();
    // Verifying page content for the recipes page
    await user.click(screen.getByText(/Browse Recipes/i));
    expect(screen.getByText(/Search recipes/i)).toBeInTheDocument();
  });

  test("Navigate to add recipe page, rendered correctly", async () => {
    render(<App />);
    const user = userEvent.setup();
    // Verifying page content for add recipe page
    await user.click(screen.getByText(/Add a recipe/i));
    expect(screen.getByText(/Add your recipe/i)).toBeInTheDocument();
  });
});

describe("Form test", () => {
  test("Checking that form is rendered properly", () => {
    render(<AddRecipePage />);
    expect(screen.getByText(/^your name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^title$/i)).toBeInTheDocument();
  });

  test("Checking that form successfully submits with correct data", async () => {
    render(<AddRecipePage />, { wrapper: BrowserRouter });
    const titleInput = screen.getByLabelText(/title/i);
    console.log(titleInput);
    const instructionsInput = screen.getByLabelText(/instructions/i);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    userEvent.type(titleInput, "New recipe");
    userEvent.type(instructionsInput, "Cook and eat!");
    await userEvent.click(submitButton);
    const confirmation = screen.getByText("See your recipe");
    expect(confirmation).toBeInTheDocument();
  });
});

// simulating user interaction
/*
test("allows users to add items to their list", () => {
  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText("What needs to be done?");
  const button = getByText("Add #1");

  fireEvent.change(input, { target: { value: "Feed cats" } });
  fireEvent.click(button);
  // look at @testing-library/user-event for more interactions
  // https://testing-library.com/docs/user-event/intro

  getByText("Feed cats");
  getByText("Add #2");
});
*/

test("Opens BCH link on a new tab", () => {
  render(<App />);
  //const collegeLink = screen.getByText("");
  // expect(collegeLink.getAttribute("href").toBe("http://bc.fi"));
  /* document.addEventListener("DOMContentLoaded", function() {
      expect(document.querySelector('a').getAttribute('href')).toBe('http://bc.fi');
    }); */
});
