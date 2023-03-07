export type WeatherApiResponse = {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: Array<Forecast>;
  };
} | null;

export type Location = {
  name: string;
  country: string;
} | null;

export type CurrentWeather = {
  temp_c: number;
  temp_f: number;
  is_day: number;
  last_updated: Date;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_dir: string;
  humidity: number;
  uv: number;
} | null;

export type Forecast = {
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
};
