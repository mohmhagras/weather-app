import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastService } from './shared/services/forecast/forecast.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { IconsModule } from './icons/icons.module';
import { CurrentHighlightsComponent } from './current-highlights/current-highlights.component';
import { HoursForecastComponent } from './hours-forecast/hours-forecast.component';
import { DaysForecastComponent } from './days-forecast/days-forecast.component';
import { OptionsHeaderComponent } from './options-header/options-header.component';
@NgModule({
  declarations: [AppComponent, CurrentWeatherComponent, CurrentHighlightsComponent, HoursForecastComponent, DaysForecastComponent, OptionsHeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, IconsModule],
  providers: [ForecastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
