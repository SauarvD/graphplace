import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class BarComponent implements OnInit {

  public graphData: any = [
    {label:"India",value:10},
    {label:"China",value:30},
    {label:"USA",value:40},
    {label:"UK",value:20},
    {label:"Argentina",value:80},
    {label:"Brazil",value:55},
    {label:"Thailand",value:70},
    {label:"Russia",value:40}
  ]
  public graphWidth:any;
  public graphHeight:any;
  public x: any;
  public y: any;
  public svg: any;
  public g: any;
  public yTicks: any;
  public legend_text: any = "data";

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.graphWidth = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#barParent'), null).getPropertyValue('width'), 10);
    this.graphHeight = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#barParent'), null).getPropertyValue('height'), 10);
    this.removeExistingGraph();
    this.processGraphdata();
  }

  onResize() {
    const element = document.getElementById('barParent');
    if (element) {
        this.graphWidth = parseInt((window.getComputedStyle(element, null).getPropertyValue('width')).split('px')[0], 10);
        this.graphHeight = parseInt((window.getComputedStyle(element, null).getPropertyValue('height')).split('px')[0], 10);
        this.removeExistingGraph();
        this.processGraphdata();
    }
  }

  removeExistingGraph() {
    d3.selectAll('svg').remove();
    d3.selectAll('.barToolTip').remove();
  }

  processGraphdata(){
    // set the dimensions and margins of the graph
    var margin = {
      top: 20, right: 20, bottom: 30, left: 40
    },
    width = (this.graphWidth) - margin.left - margin.right,
    height = (this.graphHeight) - margin.top - margin.bottom;

    var tooltip = d3.select("#barchart").append("div").attr("class", "barToolTip");

    // set the ranges
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.5);
    var y = d3.scaleLinear()
              .range([height, 0]);


    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#barchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add background color to the chart
    svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("class","backbar");

    // Scale the range of the data in the domains
    x.domain(this.graphData.map(function(d) {
      return d.label;
    }));
    y.domain([0, d3.max(this.graphData, function(d) {
      return d.value;
    })]);

    // add the x Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class","x-Axis")
    .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
    .attr("class","y-Axis")
    .call(d3.axisLeft(y).tickSize(-width));

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
    .data(this.graphData)
    .enter().append("rect")
    .attr("class", "bar")
    .on('mousemove', function(d){
      d3.select(this).attr('class','highlight');
      tooltip
        .style("left", d3.event.pageX - 160 + "px")
        .style("top", y(d.value) - 25 + "px")
        .style("display", "inline-block")
        .html((d.value));
    })
    .on("mouseout", function(d){
      d3.select(this).attr('class', 'bar'); 
      tooltip.style("display", "none");
    })
    .attr("x", function(d) {
      return x(d.label);
    })
    .attr("width", x.bandwidth())
    .attr("y", function(d) {
      return height;
    })
    .attr('height', 0)
    .transition()
    .duration(500)
    .delay((d, i) => i * 300) // a different delay for each bar
    .attr("y", function(d) {
      return y(d.value);
    })
    .attr("height", function(d) {
      return height - y(d.value);
    });

    // add y-axis label
    svg.append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (-margin.left/1.3) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
    .text("Hours")
    .attr("class","label-text");

    // add x-axis label
    svg.append("text")
    .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
    .attr("transform", "translate("+ (width/2) +","+(height+30)+")")  // text is drawn off the screen top left, move down and out and rotate
    .text("Hours")
    .attr("class","label-text");
  }

}
