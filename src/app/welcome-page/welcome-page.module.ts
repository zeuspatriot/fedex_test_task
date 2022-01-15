import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page.component';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [MatButtonModule, RouterModule],
  exports: [WelcomePageComponent],
})
export class WelcomePageModule {}
