export type WeatherApiResponse = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    is_day: boolean;
    last_updated: Date;
  };
  forecast: Object;
} | null;
