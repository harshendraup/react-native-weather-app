import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SearchBar from "./SearchBar";
import { ThemeContext } from "./ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockTheme = "light";
const mockOnSearch = jest.fn();

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load last searched city from AsyncStorage", async () => {
    const savedCity = "New York";
    AsyncStorage.getItem.mockResolvedValue(savedCity);

    const { getByPlaceholderText } = render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <SearchBar onSearch={mockOnSearch} />
      </ThemeContext.Provider>
    );

    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith("lastCity"));
    
    const input = getByPlaceholderText("Enter city name");
    expect(input.props.value).toBe(savedCity); 
  });

  it("should trigger onSearch when the search button is clicked", async () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <SearchBar onSearch={mockOnSearch} />
      </ThemeContext.Provider>
    );

    const input = getByPlaceholderText("Enter city name");
    const searchButton = getByText("Search");

    fireEvent.changeText(input, "Los Angeles");
s
    fireEvent.press(searchButton);

    await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith("Los Angeles"));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("lastCity", "Los Angeles");
  });

  it("should not trigger onSearch if input is empty", async () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeContext.Provider value={{ theme: mockTheme }}>
        <SearchBar onSearch={mockOnSearch} />
      </ThemeContext.Provider>
    );

    const input = getByPlaceholderText("Enter city name");
    const searchButton = getByText("Search");

    fireEvent.changeText(input, "");

    fireEvent.press(searchButton);

    await waitFor(() => expect(mockOnSearch).not.toHaveBeenCalled());
  });

  it("should apply correct theme styles", () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeContext.Provider value={{ theme: "dark" }}>
        <SearchBar onSearch={mockOnSearch} />
      </ThemeContext.Provider>
    );

    const input = getByPlaceholderText("Enter city name");
    const button = getByText("Search");

    expect(input.props.style).toContainEqual(expect.objectContaining({ borderBottomColor: "#fff" }));
    expect(button.props.style).toContainEqual(expect.objectContaining({ backgroundColor: "#808080" }));
  });
});
