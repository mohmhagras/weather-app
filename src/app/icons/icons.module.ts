import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { MapPin, Clock } from 'angular-feather/icons';

const icons = {
  MapPin,
  Clock,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
