import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity  style={{width: 70, height: 50, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', borderRadius: 5}} onPress={() => onSearch(city)}>
        <Text style={{color: '#ffffff'}}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginTop: 20, paddingHorizontal: 20 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10, padding: 5 },
});

export default SearchBar;
