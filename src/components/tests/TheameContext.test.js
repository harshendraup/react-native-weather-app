import React from "react";
import { render, act } from "@testing-library/react-native";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("ThemeContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load saved theme from AsyncStorage", async () => {
    AsyncStorage.getItem.mockResolvedValue("dark");

    const TestComponent = () => {
      const { theme } = React.useContext(ThemeContext);
      return <></>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {});

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("theme");
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("should toggle theme from light to dark and update AsyncStorage", async () => {
    AsyncStorage.getItem.mockResolvedValue("light");

    const TestComponent = () => {
      const { theme, toggleTheme } = React.useContext(ThemeContext);
      return (
        <>
          <Text>{theme}</Text>
          <Button onPress={toggleTheme} title="Toggle Theme" />
        </>
      );
    };

    const { getByText, queryByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(queryByText("light")).not.toBeNull();

    act(() => {
      getByText("Toggle Theme").props.onPress();
    });

    await act(async () => {});

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("should provide theme and toggle function to children", async () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = React.useContext(ThemeContext);
      return (
        <>
          <Text>{theme}</Text>
          <Button onPress={toggleTheme} title="Toggle Theme" />
        </>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(queryByText("light")).not.toBeNull();
  });
});
