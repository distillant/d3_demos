/**
 * Created by patrick conroy on 10/29/14.
 */


var CHLineChart= function(options)
{
    var xScale,yScale;

    var dataArray =[];
    var lineArray=[];


   var color= d3.scale.category10();

    var that=this;
    var svg =d3.select(options.target)
        .append("svg")
        .attr("width",options.width)
        .attr("height",options.height);


    dataArray.forEach(function(dataItem) {

        lineArray.push(svg.select("path").data(dataItem));
       // this.line2.classed("line2",true);

    });



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

    var addLine= function(dataSet,i) {

            svg.append("path")
                .attr("d", linePath(dataSet))
                .attr("fill",color(i));

    };

    var removeOld= function(data){
        var currentTime =new Date();

        var MS_PER_MINUTE = 60000;
        var minutes=1
        var myStartDate = new Date(currentTime - minutes*MS_PER_MINUTE);
        var tempArray=[];
        for (var i=0; i< data.length; i++)
         {

              var itemTime=data[i].timeStamp;
              if (itemTime > myStartDate)
              {
                 tempArray.push(data[i]);
              }
         }
        return tempArray;



    };
    var redraw =function()
    {

            yScale = d3.scale.linear()
                .domain([0, 10]) /*
                 d3.max(10,

                 Array.concat(that.line1,that.data.Line2), function(d){
                 if( typeof d.value != "undefined" )
                 return +d.value;
                 else return 0;
                 })
                ])  */

            .range([0, +options.height]);
            xScale = d3.scale.linear()
                .domain([0, //80] /*
                 d3.max([80, d3.max([dataArray[0].length,dataArray[0].length])])
                 ])
                .range([0, +options.width]);

        svg.selectAll("path").remove();
        dataArray.forEach(function(dataItem,i) {

                dataArray[i]=removeOld(dataItem,i);
                addLine(dataArray[i],i);
            }
        );


    };


    return({dataArray:dataArray, redraw:redraw });

};

