import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { PieComponent } from '../graphs/pie/pie.component';
import { DonutComponent } from '../graphs/donut/donut.component';
import { LineComponent } from '../graphs/line/line.component';
import { AreaComponent } from '../graphs/area/area.component';
import { ModalsComponent } from '../modals/modals.component';
import { BubbleComponent } from '../graphs/bubble/bubble.component';
import { BarComponent } from '../graphs/bar/bar.component';

const routes: Routes = [
    {
        path: 'home',
        component: LandingPageComponent,
        children: [
            {
                path: 'view',
                component: ModalsComponent,
                children: [
                    {
                        path: 'pie',
                        component: PieComponent
                    },
                    {
                        path: 'donut',
                        component: DonutComponent
                    },
                    {
                        path: 'bar',
                        component: BarComponent
                    },
                    {
                        path: 'area',
                        component: AreaComponent
                    },
                    {
                        path: 'line',
                        component: LineComponent
                    },
                    {
                        path: 'bubble',
                        component: BubbleComponent
                    }
                ]
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LandingPageRoutingModule {}