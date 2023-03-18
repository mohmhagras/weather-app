import { RequestStatus } from '../enums/request-status';

export type WeatherApiResponse =
  | WeatherApiLoading
  | WeatherApiSuccess
  | WeatherApiFailure;

export type WeatherApiLoading = [RequestStatus.LOADING, null];
export type WeatherApiSuccess = [RequestStatus.SUCCESS, WeatherData];
export type WeatherApiFailure = [RequestStatus.ERROR, Error];

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: Array<Forecast>;
  };
}

export interface Location {
  name: string;
  country: string;
}

export interface CurrentWeather {
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
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
}

export interface Forecast {
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
  hour: CurrentWeather[];
}
