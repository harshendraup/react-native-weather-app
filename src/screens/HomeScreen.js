import React, { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { fetchWeather } from "../services/weatherService";

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);


  const handleSearch = async (city) => {
    const API_KEY = '824ca6506779e11438f5b9f10bff1fef';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a58bd47e7bf9d040c087a518656ae49&units=metric`;
    await fetch(URL)
    .then(response => response.json())
    .then(res => setWeather(res))
    .catch(error => Alert.alert('Error fetching weather data:', error));
  }

  return (
    <View>
      <Text style={{color: 'red', fontSize: 24}}> Whether I am able to see</Text>
      <SearchBar onSearch={handleSearch} />
      <WeatherCard weather={weather} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
});

export default HomeScreen;
