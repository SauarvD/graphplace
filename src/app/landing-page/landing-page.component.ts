import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public graphData:any=[
    {
      title:"Bar Chart",
      image:"../../assets/images/bar.png",
      value: 'bar'
    },
    {
      title:"Pie Chart",
      image:"../../assets/images/pie.png",
      value: 'pie'
    },
    {
      title:"Donut Chart",
      image:"../../assets/images/donut.png",
      value: 'donut'
    },
    {
      title:"Line Chart",
      image:"../../assets/images/line.png",
      value: 'line'
    },
    {
      title:"Area Chart",
      image:"../../assets/images/area.png",
      value: 'area'
    },
    {
      title:"Bubble Chart",
      image:"../../assets/images/bubble.png",
      value: 'bubble'
    }
  ]

  constructor(private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
  }

  navigateTo(value){
    this.router.navigate(['view/'+value],{relativeTo:this.route})
  }

}
