import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "./App";
import { ThemeContext } from "./components/context/ThemeContext";

jest.mock("./screens/HomeScreen", () => "HomeScreen");

describe("App Component", () => {
  it("should render HomeScreen component", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: jest.fn() }}>
        <App />
      </ThemeContext.Provider>
    );

    // Check if the HomeScreen component is rendered
    expect(getByText("HomeScreen")).toBeTruthy();
  });

  it("should apply dark theme styles", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: jest.fn() }}>
        <App />
      </ThemeContext.Provider>
    );

    const container = getByTestId("app-container");
    expect(container.props.style).toContainEqual(expect.objectContaining({ backgroundColor: "#222" }));
  });

  it("should apply light theme styles", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: jest.fn() }}>
        <App />
      </ThemeContext.Provider>
    );

    const container = getByTestId("app-container");
    expect(container.props.style).toContainEqual(expect.objectContaining({ backgroundColor: "#fff" }));
  });

  it("should toggle theme when toggleTheme is called", () => {
    const toggleTheme = jest.fn();

    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme }}>
        <App />
      </ThemeContext.Provider>
    );

    fireEvent.press(getByTestId("toggle-button"));
    expect(toggleTheme).toHaveBeenCalled();
  });
});
