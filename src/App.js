import React, { useContext } from "react";
import { SafeAreaView, View, Button, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { ThemeProvider, ThemeContext } from "./components/context/ThemeContext.js";
import { WeatherProvider } from "./components/context/weatherContext.js";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <WeatherProvider>
      <SafeAreaView style={[styles.container, theme === "dark" && styles.containerDark]}>
        <HomeScreen />
      </SafeAreaView>
    </WeatherProvider>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#222" },
});

export default () => (

  <ThemeProvider>
    <App />
  </ThemeProvider>
);
