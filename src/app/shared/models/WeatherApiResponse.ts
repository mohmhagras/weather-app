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
  is_day: boolean;
  last_updated: Date;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
} | null;
