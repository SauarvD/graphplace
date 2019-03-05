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
      image:"../../assets/images/image.svg",
      value: 'bar'
    },
    {
      title:"Pie Chart",
      image:"../../assets/images/image.svg",
      value: 'pie'
    },
    {
      title:"Donut Chart",
      image:"../../assets/images/image.svg",
      value: 'donut'
    },
    {
      title:"Line Chart",
      image:"../../assets/images/image.svg",
      value: 'line'
    },
    {
      title:"Area Chart",
      image:"../../assets/images/image.svg",
      value: 'area'
    },
    {
      title:"Bubble Chart",
      image:"../../assets/images/image.svg",
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
