import { fetchWeather } from './fetchWeather';
import { Alert } from 'react-native';

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
}));

global.fetch = jest.fn();

describe("fetchWeather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch weather data and alert on success", async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ main: { temp: 25 }, weather: [{ description: "Clear sky" }] }),
    };
    
    fetch.mockResolvedValue(mockResponse);

    await fetchWeather();

    expect(fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=5a58bd47e7bf9d040c087a518656ae49&units=metric'
    );

    expect(Alert.alert).toHaveBeenCalledWith("Hello I am in api call", { main: { temp: 25 }, weather: [{ description: "Clear sky" }] });
  });

  it("should alert on error when fetching weather data fails", async () => {
    const mockError = new Error("Failed to fetch");
    
    fetch.mockRejectedValue(mockError);

    await fetchWeather();

    expect(Alert.alert).toHaveBeenCalledWith("Error fetching weather data:", mockError);
  });
});
