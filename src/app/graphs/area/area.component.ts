import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AreaComponent implements OnInit {

  public graphData: any = [
    {date:"Jan-18",value:10, limit: 30},
    {date:"Feb-18",value:20, limit: 35},
    {date:"Mar-18",value:20, limit: 27},
    {date:"Apr-18",value:10, limit: 41},
    {date:"May-18",value:37, limit: 54},
    {date:"Jun-18",value:25, limit: 43},
    {date:"Jul-18",value:30, limit: 67},
    {date:"Sep-18",value:55, limit: 40},
    {date:"Oct-18",value:33, limit: 81},
    {date:"Nov-18",value:75, limit: 79},
    {date:"Dec-18",value:47, limit: 95}
  ]
  public graphWidth:any;
  public graphHeight:any;
  public data:any;

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.graphWidth = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#areaParent'), null).getPropertyValue('width'), 10);
    this.graphHeight = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#areaParent'), null).getPropertyValue('height'), 10);
    this.removeExistingGraph();
    this.processGraphdata();
  }

  onResize() {
    const element = document.getElementById('areaParent');
    if (element) {
        this.graphWidth = parseInt((window.getComputedStyle(element, null).getPropertyValue('width')).split('px')[0], 10);
        this.graphHeight = parseInt((window.getComputedStyle(element, null).getPropertyValue('height')).split('px')[0], 10);
        this.removeExistingGraph();
        this.processGraphdata();
    }
  }

  removeExistingGraph() {
    d3.selectAll('svg').remove();
    d3.selectAll('.lineTooltip').remove();
  }

  processGraphdata(){
    var div = d3.select("#areachart").append("div")
            .attr("class", "lineTooltip")
            .style("display", "none");

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = this.graphWidth - margin.left - margin.right,
        height = this.graphHeight - margin.top - margin.bottom;
    
    // parse the date / time
    var parseTime = d3.timeParse("%b-%y");   

    this.data = JSON.parse(JSON.stringify(this.graphData));
    this.data.forEach(function(d){
      d.date = parseTime(d.date);
    })

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the area
    var area = d3.area()
                  .x(function(d) { return x(d.date); })
                  .y0(height)
                  .y1(function(d) { return y(d.value); })
                  .curve(d3.curveMonotoneX);

    // define the line
    var valueline = d3.line()
                      .x(function(d) { return x(d.date); })
                      .y(function(d) { return y(d.value); })
                      .curve(d3.curveMonotoneX);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#areachart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    // scale the range of the data
    x.domain(d3.extent(this.data, function(d) { return d.date; }));
    y.domain([0, d3.max(this.data, function(d) { return d.value; })]);

    // add the area
    svg.append("path")
        .data([this.data])
        .attr('clip-path', 'url(#clip)')
        .transition()
        .duration(2000)
        .attr("class", "area")
        .attr("d", area);

    // add the valueline path.
    svg.append("path")
        .data([this.data])
        .attr('clip-path', 'url(#clip)')
        .transition()
        .duration(2000)
        .attr("class", "line")
        .attr("d", valueline);

    svg.append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', 0)
        .attr('height', height);

    svg.select('#clip rect')
        .transition()
        .duration(2000)
        .attr('width', width);

    // add the dots with tooltips
    var fixeddot = svg.selectAll("dot")
        .data(this.data)
        .enter().append("circle")
        .attr("r", 5)
    
        fixeddot.attr("cx", function (d) {
          return x(d.date);
      })
      .attr("cy", function (d) {
          return y(d.value);
      })
      .on("mouseover", function (d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", 7);
          div.transition()
              .style("display", "inline-block");
          div.html("<p>Date:" + d.date + "</p> <p>Value:" + d.value + "</p>")
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d){
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 5);
        div.transition()
            .style("display", "none")
      });

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x-Axis")
        .call(d3.axisBottom(x));

    // add the Y Axis
    svg.append("g")
        .attr("class","y-Axis")
        .call(d3.axisLeft(y));
  }

}
