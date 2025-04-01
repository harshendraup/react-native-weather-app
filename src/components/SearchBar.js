import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext.js"
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const loadCity = async () => {
      const savedCity = await AsyncStorage.getItem("lastCity");
      if (savedCity) {
        setCity(savedCity);
        onSearch(savedCity);
      }
    };
    loadCity();
  }, []);

  const handleSearch = async () => {
    if (city.trim() === "") return;
    await AsyncStorage.setItem("lastCity", city);
    onSearch(city);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, theme === "dark" && styles.inputDark]}
        placeholder="Enter city name"
        placeholderTextColor={theme === "dark" ? "#aaa" : "#555"}
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity
        style={[styles.button, theme === "dark" && styles.buttonDark]}
        onPress={handleSearch}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginTop: 10, paddingHorizontal: 20 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10, padding: 5 },
  inputDark: { borderBottomColor: "#fff", color: "#fff" },
  button: { width: 70, height: 50, backgroundColor: "#4a90e2", alignItems: "center", justifyContent: "center", borderRadius: 5 },
  buttonDark: { backgroundColor: "#808080" },
  buttonText: { color: "#fff" },
});

export default SearchBar;
