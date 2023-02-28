import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { WeatherApiResponse } from '../../models/WeatherApiResponse';
@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  private getCityName(): Observable<string> {
    return this.http.get<string>(environment.locationApiUrl, {
      responseType: 'text' as 'json',
    });
  }

  private getForecast(cityName: string): Observable<WeatherApiResponse> {
    return this.http.get<WeatherApiResponse>(
      `${environment.weatherApiUrl}&q=${cityName}`
    );
  }

  get() {
    return this.getCityName().pipe(
      switchMap((cityName) => {
        return this.getForecast(cityName);
      })
    );
  }
}
