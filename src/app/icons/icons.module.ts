import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  MapPin,
  Clock,
  Sunrise,
  Sunset,
  Sun,
  Thermometer,
  Eye,
  Droplet,
} from 'angular-feather/icons';

const icons = {
  MapPin,
  Clock,
  Sunrise,
  Sunset,
  Sun,
  Thermometer,
  Eye,
  Droplet,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
