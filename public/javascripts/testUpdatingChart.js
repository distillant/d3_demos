/**
 * Created by patrick conroy on 9/10/14.
 */
var ScatterData=[[9,23],[70,15],[30,4]];

var ScatterPlot = function(data)
{
    var svg = d3.select("#graphSpace").append("svg");
    this.data=data;

    this.update= function()
    {
        var circle =svg.selectAll("circle").data(this.data);
    var circleEnter = circle.enter().append("circle");
        circleEnter.attr("cy",function(d){ return d[0]; })
            .attr("cx",function(d){ return d[1]; })
            .attr("r",3);

        circle.exit().remove();
    }
};
var scatterPlot= new ScatterPlot(ScatterData);

scatterPlot.data.push([200,30]);
//scatterPlot.update();
scatterPlot.data.push([150,50]);
scatterPlot.update();