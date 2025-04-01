import React, { useContext } from "react";
import { SafeAreaView, View, Button, StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import { ThemeProvider, ThemeContext } from "./components/context/ThemeContext.js";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, theme === "dark" && styles.containerDark]}>
      <HomeScreen />
    </SafeAreaView>
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
