import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastService } from './shared/services/forecast/forecast.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { IconsModule } from './icons/icons.module';
@NgModule({
  declarations: [AppComponent, CurrentWeatherComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, IconsModule],
  providers: [ForecastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
