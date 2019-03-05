import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { PieComponent } from '../graphs/pie/pie.component';
import { DonutComponent } from '../graphs/donut/donut.component';
import { BarComponent } from '../graphs/bar/bar.component';
import { LineComponent } from '../graphs/line/line.component';
import { AreaComponent } from '../graphs/area/area.component';
import { BubbleComponent } from '../graphs/bubble/bubble.component';
import { ModalsComponent } from '../modals/modals.component';

/*Feature modules*/
import { LandingPageRoutingModule } from './landing-page.routing.module';

@NgModule({
  declarations: [
    LandingPageComponent,
    PieComponent,
    DonutComponent,
    BarComponent,
    LineComponent,
    AreaComponent,
    BubbleComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    LandingPageRoutingModule,
    RouterModule
  ]
})
export class LandingPageModule { }
