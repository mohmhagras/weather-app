import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  switchMap,
  throwError,
} from 'rxjs';
import {
  WeatherApiResponse,
  WeatherData,
  Location,
} from '../../models/WeatherApiResponse';
import { RequestStatus } from '../../enums/request-status';
import { timer } from 'rxjs';
import createDateObject from '../../helpers/create-date-object';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {
    this.get();
  }

  data = new BehaviorSubject<WeatherApiResponse>([
    RequestStatus.LOADING,
    undefined,
  ]);
  currentDateTime!: BehaviorSubject<Date>;

  private getCityName(): Observable<string> {
    return this.http.get<string>(environment.locationApiUrl, {
      responseType: 'text' as 'json',
    });
  }

  private getForecast(cityName: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${environment.weatherApiUrl}&q=${cityName}`
    );
  }

  private catchError(error: HttpErrorResponse) {
    if (error.status === 0) {
      return throwError(
        () => new Error('Network Error. Please check your connection.')
      );
    } else {
      return throwError(
        () => new Error('Server Error. Please try again later.')
      );
    }
  }

  private get(location?: string) {
    let getDataObservable: Observable<WeatherData>;
    if (location === undefined) {
      getDataObservable = this.getCityName().pipe(
        switchMap((cityName) => {
          return this.getForecast(cityName);
        }),
        retry(2),
        catchError(this.catchError)
      );
    } else {
      getDataObservable = this.getForecast(location);
    }
    getDataObservable.subscribe({
      next: (result) => {
        this.currentDateTime = new BehaviorSubject(
          createDateObject(result.location.localtime)
        );
        timer(0, 1000).subscribe(() =>
          this.currentDateTime.next(
            new Date(this.currentDateTime.value.valueOf() + 1000)
          )
        );
        this.data.next([RequestStatus.SUCCESS, result]);
      },
      error: (error) => {
        this.data.next([RequestStatus.ERROR, error]);
      },
    });
  }

  getCurrentWeather() {
    if (this.data.value[0] !== 'success')
      throw new Error('Called before data is available!');
    const { name, country } = this.data.value[1].location;
    const { is_day, condition, temp_c, temp_f } = this.data.value[1].current;
    const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } =
      this.data.value[1].forecast.forecastday[0].day;
    return {
      weatherText: condition.text,
      weatherIcon: condition.icon,
      weatherCode: condition.code,
      city: name,
      country,
      is_day,
      temp_c,
      temp_f,
      maxtemp_c,
      maxtemp_f,
      mintemp_c,
      mintemp_f,
    };
  }

  getHoursForecast() {
    if (this.data.value[0] !== 'success')
      throw new Error('Called before data is available!');
    const currentHour = new Date(this.currentDateTime.value).getHours();
    const leftHours = this.data.value[1].forecast.forecastday[0].hour.slice(
      currentHour + 1
    );
    return leftHours;
  }

  getHighlights() {
    if (this.data.value[0] !== 'success')
      throw new Error('Called before data is available!');
    const {
      wind_kph,
      wind_mph,
      wind_dir,
      humidity,
      uv,
      feelslike_c,
      feelslike_f,
      vis_km,
      vis_miles,
    } = this.data.value[1].current;
    const { sunrise, sunset } =
      this.data.value[1].forecast.forecastday[0].astro;
    return {
      wind_kph,
      wind_mph,
      wind_dir,
      humidity,
      uvNumber: uv,
      sunrise,
      sunset,
      feelslike_c,
      feelslike_f,
      vis_km,
      vis_miles,
    };
  }

  getDaysForecast() {
    if (this.data.value[0] !== 'success')
      throw new Error('Called before data is available!');
    return this.data.value[1].forecast.forecastday;
  }

  getTargetLocation() {
    if (this.data.value[0] !== 'success')
      throw new Error('Called before data is available!');

    return this.data.value[1].location;
  }

  search(query: string) {
    return this.http.get<Location[]>(`${environment.searchApiUrl}&q=${query}`);
  }

  changeLocation(location: string) {
    this.data.next([RequestStatus.LOADING, undefined]);
    this.get(location);
  }
}
