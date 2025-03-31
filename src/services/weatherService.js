// import axios from 'react-native-axios'

// const API_KEY = "da83e6e7bf258b2a5b52aa26843759df";
// const BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${API_KEY}${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`

// export const fetchWeather = async (city) => {
//   try {
//     const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
 
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     return null;
//   }
// };

const API_KEY = '824ca6506779e11438f5b9f10bff1fef';
const CITY = 'Delhi';
const URL = `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=5a58bd47e7bf9d040c087a518656ae49&units=metric`;

export const fetchWeather = () => {
  fetch(URL)
  .then(response => {
    Alert.alert("Hello I am in api call", response.json());
    // r
  })
  .catch(error => Alert.alert('Error fetching weather data:', error));

}