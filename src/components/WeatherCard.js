import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ThemeContext } from "./context/ThemeContext";

const WeatherCard = ({ weather }) => {
  const { theme } = useContext(ThemeContext);

  if (!weather) return (
    <View style={[styles.card, theme === "dark" && styles.cardDark]}>
      <Text style={styles.city}>No Data Found</Text>
    </View>
  );

  return (
    <View style={[styles.card, theme === "dark" && styles.cardDark]}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather?.main?.temp}°C</Text>
      <Text style={styles.description}>{weather?.weather[0]?.description}</Text>
      <Image 
        source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} 
        style={styles.weatherIcon} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: "#4a90e2", borderRadius: 10, margin: 10, marginTop: 25, alignItems: "center" },
  cardDark: { backgroundColor: "#808080" },
  city: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  temp: { fontSize: 40, fontWeight: "bold", color: "#fff" },
  description: { fontSize: 18, color: "#fff" },
  weatherIcon: { width: 100, height: 100, marginTop: 10 }, // Adjusted size for better visibility
});

export default WeatherCard;
