import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { ThemeContext } from "../components/context/ThemeContext";
import { WeatherContext } from "../components/context/weatherContext";
import DayIcon from '../../assets/day.png';
import NightIcon from '../../assets/dayOff.png';

const HomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {weather, setWeather} = useContext(WeatherContext);
  const [currentIcon, setCurrentIcon] = useState(DayIcon); 

  useEffect(() => {
    const loadWeather = async () => {
      const lastCity = await AsyncStorage.getItem("lastCity");
      if (lastCity) {
        handleSearch(lastCity);
      }
    };
    loadWeather();
  }, []);

  const handleSearch = async (city) => {
    if (!city.trim()) return;

    const API_KEY = "824ca6506779e11438f5b9f10bff1fef";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data)
      if (data.cod !== 200) {
        Alert.alert("Error", data.message);
        return;
      }

      setWeather(data);
      await AsyncStorage.setItem("lastCity", city);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data.");
    }
  };

  const handleToggleTheme = () => {
    toggleTheme(); 
    setCurrentIcon(theme === "dark" ? DayIcon : NightIcon); 
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.darkBackground]}>
      <SearchBar onSearch={handleSearch} />
      <WeatherCard weather={weather} />
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggleTheme}>
        <Image source={currentIcon} style={styles.icon} />
        <Text style={[styles.buttonText, theme === "dark" && styles.darkText]}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center"},
  darkBackground: { backgroundColor: "#333" },
  toggleButton: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#808080", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  icon: {
    width: 20, 
    height: 20, 
    marginRight: 10, 
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  darkText: {
    color: "#000", 
  },
});

export default HomeScreen;
