import React from "react";
import { render } from "@testing-library/react-native";
import WeatherCard from "./WeatherCard";
import { ThemeContext } from "./ThemeContext";

const mockTheme = "light";

describe("WeatherCard Component", () => {
  it("renders 'No Data Found' when no weather data is provided", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <WeatherCard />
      </ThemeContext.Provider>
    );

    expect(getByText("No Data Found")).toBeTruthy();
  });

  it("renders weather details correctly when weather data is provided", () => {
    const weatherData = {
      name: "New York",
      main: { temp: 22 },
      weather: [{ description: "Clear sky", icon: "01d" }],
    };

    const { getByText, getByTestId } = render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <WeatherCard weather={weatherData} />
      </ThemeContext.Provider>
    );

    expect(getByText("New York")).toBeTruthy();
    expect(getByText("22°C")).toBeTruthy();
    expect(getByText("Clear sky")).toBeTruthy();
    expect(getByTestId("weather-icon")).toBeTruthy();
  });

  it("applies correct styles based on the theme", () => {
    const weatherData = {
      name: "Los Angeles",
      main: { temp: 25 },
      weather: [{ description: "Sunny", icon: "01d" }],
    };

    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "dark" }}>
        <WeatherCard weather={weatherData} />
      </ThemeContext.Provider>
    );

    const card = getByTestId("weather-card");
    expect(card.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: "#808080" })
    );
  });
});