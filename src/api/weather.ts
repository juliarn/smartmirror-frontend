import createRequest from './index';

export interface MainWeatherInfo {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
}

export interface WeatherInfo {
  main: string;
  description: string;
  icon: string;
}

export interface Weather {
  weather: WeatherInfo[];
  main: MainWeatherInfo;
  name: string;
  dt: number;
}

export interface FullWeather {
  current: Weather;
  forecast: Weather[];
}

export async function getWeather(): Promise<FullWeather | null> {
  const language = window.navigator.language.split('-')[0];
  const position: GeolocationPosition | null = await new Promise(resolve =>
    window.navigator.geolocation.getCurrentPosition(resolve, () =>
      resolve(null)
    )
  );

  if (!position) {
    return null;
  }

  const response = await createRequest('services/weather/state', 'POST', {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    lang: language,
  });
  return await response.json();
}
