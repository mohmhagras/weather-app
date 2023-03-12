import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, switchMap, throwError } from 'rxjs';
import { WeatherData } from '../../models/WeatherApiResponse';
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

  get() {
    return this.getCityName().pipe(
      switchMap((cityName) => {
        return this.getForecast(cityName);
      }),
      retry(2),
      catchError(this.catchError)
    );
  }
}
