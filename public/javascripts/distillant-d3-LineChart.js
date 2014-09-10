/**
     * Created by patrick conroy on 8/27/14.
     */

if (!d3) {
    console.log("Error: d3 namespace not found, did you include d3.js before this distillant-d3-linechart?");
}
//add distillant namespace to d3 if it doesn't exist
if (!d3.distillant) d3.distillant={};

d3.distillant.lineChart=function(options) {

    var yScale, xScale, timeScale;

    var chartCoords = [];

    timeScale = d3.time.scale()
        .domain(
        d3.extent(options.data, function (d) {
            return (d.date)
        }))
        .range([options.margins.left,
                options.width - (options.margins.right + options.margins.left)]);

    xScale = d3.scale.linear()
        .domain([0,options.data.length])
        .range([options.margins.left,
                options.width - (options.margins.right + options.margins.left)
        ]);

    yScale = d3.scale.linear()
        .domain([
            d3.max(options.data, function (d) {
                return d.close
            }) ,
            d3.min(options.data, function (d) {
                return d.close
            })
        ]).range([options.margins.top, options.height - (options.margins.top + options.margins.right)]);

    for (var x = 1; x < options.data.length; x++) {
        var lineCoords = { x1: xScale(x - 1),
            y1: yScale(options.data[x - 1].close),
            x2: xScale(x), y2: yScale(options.data[x].close)};
        chartCoords.push(lineCoords);
    }

    var createChart = function (chartCoords) {

        var lineChart = svg.append("g")
            .classed("linechart", true);

        lineChart.selectAll("line").data(chartCoords).enter().append("line")
            .attr("x1", function (d) {
                return d.x1
            })
            .attr("y1", function (d) {
                return d.y1
            })
            .attr("x2", function (d) {
                return d.x2
            })
            .attr("y2", function (d) {
                return d.y2
            })
            .style({'stroke': 'black', 'stroke-width': 1});

        var xAxis = d3.svg.axis()
            .scale(timeScale)
            .orient('bottom')
            .ticks(d3.time.days, 5)
            .tickFormat(d3.time.format('%x'))
            .tickSize(5)
            .tickPadding(8);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(10)
            .tickFormat(d3.format("$ %d "))
            .tickSize(5)
            .tickPadding(8);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,370 )')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (options.margins.left - 3 ) + ', 0)')
            .call(yAxis);
    };

    var svg = d3.select(options.target).append("svg")
        .attr("width", options.width)
        .attr("height", options.height);

    createChart(chartCoords);
};
