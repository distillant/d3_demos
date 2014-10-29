/**
 * Created by patrick conroy on 10/29/14.
 */


var CHLineChart= function(options)
{
    var xScale,yScale;

    this.data={
        Line1:[{value: 0}],
        Line2:[{value:0}]
    };

    var that=this;
    var svg =d3.select(options.target)
        .append("svg")
        .attr("width",options.width)
        .attr("height",options.height);

    this.line1=svg.select("path").data(this.data.Line1);
    this.line2=svg.select("path").data(this.data.Line2);

    this.line1.classed("line1",true);
    this.line2.classed("line2",true);



    var linePath = d3.svg.area()
            .x(function (d, i) {
                if (typeof d.value != "undefined")
                    return xScale(i);
                else
                    return 0;
            })
                .y(function (d) {
                    if (typeof d.value != "undefined")
                        return yScale(d.value);
                    else
                        return 0;
                })
                .y1(function () {
                    return options.height;
                })
                .interpolate("basic");

    var addLine= function(dataSet,className) {

            svg.append("path")
                .attr("d", linePath(dataSet))
                .classed(className, true);

    };

    var removeOld= function(data){
        var currentTime =new Date();

        var MS_PER_MINUTE = 60000;
        var minutes=1
        var myStartDate = new Date(currentTime - minutes*MS_PER_MINUTE);
        var tempArray=[];
        data.forEach(function(d)
        {
            var itemTime=d.timeStamp;
            if (itemTime >myStartDate)
                tempArray.push(d);
        });
        return tempArray;

    };
    var redraw =function()
    {



            xScale = d3.scale.linear()
                .domain([0, 10])/*
                 d3.max(10

                 Array.concat(that.line1,that.data.Line2), function(d){
                 if( typeof d.value != "undefined" )
                 return +d.value;
                 else return 0;
                 })*/

            .range([0, +options.height]);
            yScale = d3.scale.linear()
                .domain([0, //80] /*
                 d3.max([80, d3.max([that.data.Line1.length,that.data.Line2.length])])
                 ])
                .range([0, +options.width]);


        removeOld(that.line1);
        removeOld(that.line2);
        addLine(that.line1, "line1");
    //    addLine(removeOld(that.line1),"line1");

        addLine(that.line2,"line2");

    };





    return({line1:this.line1,line2:this.line2, redraw:redraw });

};

