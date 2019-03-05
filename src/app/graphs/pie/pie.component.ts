import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class PieComponent implements OnInit {
  
  public data:any = [
    {label:"apple",value:10},
    {label:"orange",value:30},
    {label:"banana",value:40},
    {label:"kiwi",value:20}
  ];
  public graphWidth:any;
  public graphHeight:any;
  public MainTextcolor:String = "#fff";
  public strokeColor:String = "transparent";

  public dataset: any;
  public labels: any;
  public arc: any;
  public path: any;
  public pie: any;

  public radius: any;
  public svg: any;
  public duration = 600;
  public zeroData = false;
  public innerRadius = 0;
  public outerRadius = 0;
  public fontSize = 0;

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.graphWidth = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#pieParent'), null).getPropertyValue('width'), 10);
    this.graphHeight = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#pieParent'), null).getPropertyValue('height'), 10);
    this.removeExistingGraph();
    this.processGraphdata();
  }

  onResize() {
    const element = document.getElementById('pieParent');
    if (element) {
        this.graphWidth = parseInt((window.getComputedStyle(element, null).getPropertyValue('width')).split('px')[0], 10);
        this.graphHeight = parseInt((window.getComputedStyle(element, null).getPropertyValue('height')).split('px')[0], 10);
        this.removeExistingGraph();
        this.processGraphdata();
    }
  }

  removeExistingGraph() {
    d3.selectAll('svg').remove();
    d3.selectAll('.toolTip').remove();
  }
  
  processGraphdata(){
    var div = d3.select("#piechart").append("div").attr("class", "toolTip");

    // margin
    var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = (this.graphWidth - 200) - margin.right - margin.left,
        height = (this.graphHeight - 200) - margin.top - margin.bottom,
        radius = Math.min(this.graphWidth, this.graphHeight) / 2;
    // color range
    var color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"];
    // var color = ["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"];

    // pie chart arc. Need to create arcs before generating pie
    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    // generate pie chart and donut chart
    this.pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    // define the svg for pie chart
    var svg = d3.select("#piechart").append("svg")
        .attr("width", this.graphWidth)
        .attr("height", this.graphHeight)
        .append("g")
        .attr("transform", "translate(" + this.graphWidth / 2 + "," + this.graphHeight / 2 + ")");
    
    // "g element is a container used to group other SVG elements"
    var g = svg.selectAll(".arc")
            .data(this.pie(this.data))
            .enter().append("g")
            .attr("class", "arc");
            
    // append path 
    g.append("path")
      .style("fill", function(d,i) { return color[i]; })
      .transition().delay(function(d,i) {
        return i * 400; 
      })
      .duration(400)
      .attrTween('d', function(d){
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function(t) { 
          d.endAngle = i(t);
          return arc(d); 
        };
      });

    g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
	  .transition()
	  .delay(1800)
      .text(function(d) { return d.data.value + "%"; });

      d3.selectAll("path").on("mousemove", function(d) {
        div.style("left", d3.event.pageX-50+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        div.html(d.data.label);
      });

      d3.selectAll("path").on("mouseout", function(d){
        div.style("display", "none");
      });
    
  }

}
