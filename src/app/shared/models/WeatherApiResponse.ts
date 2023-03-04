export type WeatherApiResponse = {
  location: Location;
  current: CurrentWeather;
  forecast: object;
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
