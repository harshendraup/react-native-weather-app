import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen.js'

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Weather App</Text>
      </View>
        <HomeScreen/>
    </SafeAreaView>
  );
};

export default App;