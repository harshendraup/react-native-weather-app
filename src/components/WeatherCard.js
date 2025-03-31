import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WeatherCard = ({ weather }) => {
  if (!weather) return (
    <View style={styles.card}>
      <Text style={styles.city}>No Data Found</Text>
      
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather?.name}</Text>
      <Text style={styles.temp}>{weather?.main?.temp}°C</Text>
      <Text style={styles.description}>{weather?.weather[0]?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: "#4a90e2", borderRadius: 10, marginTop: 20 },
  city: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  temp: { fontSize: 40, fontWeight: "bold", color: "#fff" },
  description: { fontSize: 18, color: "#fff" },
});

export default WeatherCard;
