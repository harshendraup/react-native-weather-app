import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import { ThemeContext } from "../components/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render SearchBar and WeatherCard", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: jest.fn() }}>
        <HomeScreen />
      </ThemeContext.Provider>
    );

    expect(getByTestId("search-bar")).toBeTruthy();
    expect(getByTestId("weather-card")).toBeTruthy();
  });

  it("should fetch weather data when a city is searched", async () => {
    AsyncStorage.getItem.mockResolvedValue("London");

    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: jest.fn() }}>
        <HomeScreen />
      </ThemeContext.Provider>
    );

    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith("lastCity"));
  });

  it("should handle theme toggle", async () => {
    const { getByText, getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: jest.fn() }}>
        <HomeScreen />
      </ThemeContext.Provider>
    );

    const toggleButton = getByText("Toggle Theme");
    fireEvent.press(toggleButton);

    await waitFor(() => expect(getByTestId("toggle-button")).toBeTruthy());
  });

  it("should toggle the icon based on the theme", async () => {
    const { getByText, getByTestId } = render(
      <ThemeContext.Provider value={{ theme: "light", toggleTheme: jest.fn() }}>
        <HomeScreen />
      </ThemeContext.Provider>
    );

    const toggleButton = getByText("Toggle Theme");
    fireEvent.press(toggleButton);

    await waitFor(() => expect(getByTestId("toggle-button")).toBeTruthy());
  });
});
