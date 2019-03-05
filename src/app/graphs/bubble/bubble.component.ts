import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class BubbleComponent implements OnInit {

  public graphWidth:any;
  public graphHeight:any;
  public graphData:any = {
    items: [
      {text: "Java", count: "236"},
      {text: ".Net", count: "382"},
      {text: "Php", count: "170"},
      {text: "Ruby", count: "123"},
      {text: "D", count: "12"},
      {text: "Python", count: "170"},
      {text: "C/C++", count: "382"},
      {text: "Pascal", count: "10"},
      {text: "Something", count: "170"},
    ]
  };

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.graphWidth = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#bubbleParent'), null).getPropertyValue('width'), 10);
    this.graphHeight = parseInt(window.getComputedStyle(this.elementRef.nativeElement.querySelector('#bubbleParent'), null).getPropertyValue('height'), 10);
    this.removeExistingGraph();
    this.processGraphdata();
  }

  onResize() {
    const element = document.getElementById('bubbleParent');
    if (element) {
        this.graphWidth = parseInt((window.getComputedStyle(element, null).getPropertyValue('width')).split('px')[0], 10);
        this.graphHeight = parseInt((window.getComputedStyle(element, null).getPropertyValue('height')).split('px')[0], 10);
        this.removeExistingGraph();
        this.processGraphdata();
    }
  }

  removeExistingGraph() {
    d3.selectAll('svg').remove();
  }

  processGraphdata(){
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = this.graphWidth,
        height = this.graphHeight;
    
    var svg = d3.select("#bubblechart")
                .append("svg")
                .attr("height", height)
                .attr("width", width)
                .append("g")
                .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var radiusScale = d3.scaleSqrt().domain([1, 400]).range([10, 80 ]);

    var simulation = d3.forceSimulation()
                        .force("x", d3.forceX(width/2).strength(0.05))
                        .force("y", d3.forceY(height/2).strength(0.05))
                        .force("collide", d3.forceCollide(function(d){
                          return radiusScale(d.count) + 3;
                        }))
    
    // "g element is a container used to group other SVG elements"
    var g = svg.selectAll(".artist")
            .data(this.graphData.items)
            .enter().append("g")
            .attr("class", "artist");  
            
    g.append("circle")
        .attr("r", function(d){
          return radiusScale(d.count)
        })
        .attr("fill", "lightblue")
        .on('mousemove', function(d){
          d3.select(this).transition()
                          .duration(800)
                          .attr("r", radiusScale(d.count) + 5)
                          .style("fill","orange")
        })
        .on('mouseout', function(d){
          d3.select(this).transition()
                          .duration(800)
                          .attr("r", radiusScale(d.count))
                          .style("fill","steelblue")
        })
    

    // var circles = svg.selectAll(".artist")
    //                   .data(this.graphData.items)
    //                   .enter().append("circle")
    //                   .attr("class", "artist")
    //                   .attr("r", function(d){
    //                     return radiusScale(d.count)
    //                   })
    //                   .attr("fill", "lightblue")
    //                   .on('mousemove', function(d){
    //                     d3.select(this).transition()
    //                                     .duration(800)
    //                                     .attr("r", radiusScale(d.count) + 5)
    //                                     .style("fill","orange")
    //                   })
    //                   .on('mouseout', function(d){
    //                     d3.select(this).transition()
    //                                     .duration(800)
    //                                     .attr("r", radiusScale(d.count))
    //                                     .style("fill","steelblue")
    //                   });
                  
    // circles.append('text')
    //       .attr("text-anchor", "middle")
    //       .attr("x", function(d) { return 10; })
    //       .attr("y", 10)
    //       .text(function(d) { return d.text; } );  
                    
    simulation.nodes(this.graphData.items)
              .on('tick', ticked)

    function ticked(){
      
      g.enter().select('circle')
      .attr("cx", function(d){
        return d.x
      })
      .attr("cy", function(d){
        return d.y
      })
    }   

  }

}
