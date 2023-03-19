import React from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Testing imports
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Component imports
import App from "../App";
import Home from "../Home";
import AddRecipePage from "../AddRecipePage";
// Function imports
import { parseCountries } from "../Recipes";

// TEST GROUP 1: Making sure that all 3 cards on the home page are rendered correctly
describe("Home component - render tests", () => {
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

// TEST GROUP 2: Snapshot test
describe("Snapshot test - App front page", () => {
  test("App matches Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});

// TEST GROUP 3: Navigation test - mimicking user navigating the website
// Also checking that pages were rendered correctly in the process
describe("Navigation tests", () => {
  test("Navigated to about page, it's rendered correctly", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/About/i));
    // Verifying heading for the About page
    expect(screen.getByText(/About TasteIT/i)).toBeInTheDocument();
    // Checking that link to my Github is correct
    const myLink = screen.getByText("Valeria Vagapova");
    expect(myLink.getAttribute("href")).toBe("https://github.com/pixelsnow");
    // Checking that link to college is correct
    const collegeLink = screen.getByText("Business College Helsinki");
    expect(collegeLink.getAttribute("href")).toBe("https://en.bc.fi/");
  });

  test("Navigated to recipes page, it's rendered correctly", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/Browse Recipes/i));
    expect(screen.getByText(/Search recipes/i)).toBeInTheDocument();
  });

  test("Navigated to add recipe page, it's rendered correctly", async () => {
    render(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByText(/Add a recipe/i));
    expect(screen.getByText(/Add your recipe/i)).toBeInTheDocument();
  });
});

// TEST GROUP 4: Testing form functionality, mimicking user actions
describe("Form tests", () => {
  test("Checking that form is rendered properly", () => {
    render(<AddRecipePage />, { wrapper: BrowserRouter });
    expect(screen.getByText(/^your name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^title$/i)).toBeInTheDocument();
  });

  test("Checking that form successfully submits with correct data", async () => {
    render(<AddRecipePage />, { wrapper: BrowserRouter });

    // Fill in required fields
    // Title
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Recipe" } });
    // Description
    const instructionsInput = screen.getByLabelText(/instructions/i);
    fireEvent.change(instructionsInput, { target: { value: "Cook and eat!" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    // Confirm that recipe with correct title was posted
    const confirmation = screen.getByText(
      "Recipe New Recipe has been added successfully!"
    );
    expect(confirmation).toBeInTheDocument();
  });
});

// TEST GROUP 5: Testing that Countries API is up and working
describe("Test API", () => {
  test("Countries API test", async () => {
    await axios
      .get(`https://restcountries.com/v3.1/name/Russia`)
      .then((data) => {
        expect(data.data[0].name.official).toBe("Russian Federation");
        expect(data.data[0].cca2).toBe("RU");
      });
  });
});

// TEST GROUP 6: Testing that our server is up and working
describe("Test server", () => {
  // First recipe should be Chicken Parmesan
  test("First recipe test", async () => {
    await axios.get(`http://localhost:4000/recipes/1`).then((data) => {
      expect(data.data.name).toBe("Chicken Parmesan");
    });
  });
});

// TEST GROUP 7: Testing "under the hood" functions
describe("Test under-the-hood functions", () => {
  // parseCountries is a function that takes in an array of recipe objects and returns an array of unique countries that are encountered among the recipes.
  // In this test it's important to check that countries are not duplicated and that recipes without a country filled in don't affect the result.

  test("parseCountries() test", () => {
    const recipes = [
      {
        id: 1,
        name: "Recipe1",
        country: "Italy",
        instructions: "hi",
      },
      {
        id: 2,
        name: "Recipe2",
        country: "Italy",
        instructions: "hi",
      },
      {
        id: 3,
        name: "Recipe3",
        country: "China",
        instructions: "hi",
      },
      {
        id: 4,
        name: "Recipe4",
        country: "Finland",
        instructions: "hi",
      },
      {
        id: 5,
        name: "Recipe5",
        country: "",
        instructions: "hi",
      },
      {
        id: 6,
        name: "Recipe6",
        country: "China",
        instructions: "hi",
      },
    ];
    const result = parseCountries(recipes);
    const expectation = ["Italy", "China", "Finland"];

    // Check that result length is correct
    expect(result.length).toBe(expectation.length);

    // Check that each country matches the expected result
    result.forEach((country, index) => {
      expect(country).toBe(expectation[index]);
    });
  });
});
