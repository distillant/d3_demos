/** distillant-d3-pieChart.js
 * Created by patrick conroy on 8/29/14.
 *
 * D3 pie chart with legend.
 *
//To use this plugin add a script tag referencing it in the HTML
//Uses an array of objects as data source as below to be compatible with json.
//internal parseData function will rework it into something compatible with pie layout


var NewYorkEthnicities= [
 {ethnicity:"White", value:44.6},
 {ethnicity:"Hispanic or Latino Of Any Race", value:27.5},
 {ethnicity:"Black or African American", value:25.1},
 {ethnicity:"Asian", value:11.8},
 {ethnicity:"American Indian", value:0.4},
 {ethnicity:"Other races", value:16.1}
 ];

//uses options as below, legendOptions are optional, and legend can be set to false.
//specify the valueField and textField from your specific data objects;
//if including a legend, the svg width needs extra width vs the diameter of the pie

var pieChartOptions= {
    width:500,
    height: 300,
    radius:150,
    legend:true,
    legendOptions:{
        margins: {left:10, right: 10, top: 0, bottom:10},
        keyHeight: 25,
        padding:5
    },
    data: NewYorkEthnicities,
    valueField:"value",
    textField:"ethnicity",
    target: "#pieChart"
};


//finally create the pieChart
d3.distillant.pieChart(pieChartOptions);


 */
if (!d3.distillant) d3.distillant={};

d3.distillant.pieChart =function(options)
{
    //support 20 separate colors
    var color= d3.scale.category20();


    var createLegend = function(svg, SVGOptions) {

        var legendOptions= SVGOptions.legendOptions ||  {
            margins: {left:10, right: 10, top: 0, bottom:10},
            keyHeight: 25,
            padding:5
        };


        legendOptions.margins =legendOptions.margins || {left:10, right: 10, top: 0, bottom:10}
        legendOptions.keyHeight=legendOptions.keyHeight || 25;
        legendOptions.padding= legendOptions.padding || 5;

        legendOptions.width=(SVGOptions.width -SVGOptions.radius*2) - (legendOptions.margins.left + legendOptions.margins.right);
        legendOptions.x=(SVGOptions.radius*2) + legendOptions.margins.left;
        legendOptions.y=legendOptions.margins.top;
        legendOptions.height=  legendOptions.keyHeight* SVGOptions.data.text.length +legendOptions.padding*2;


        if (options.height < legendOptions.height)
            console.log("Pie Chart Warning: Pie chart legend exceeds Height of pieChart SVG");

        var legend = svg.append("rect")
            .classed("legend", true)
            .attr("x",  legendOptions.x)
            .attr("y",  legendOptions.y)
            .attr("width",  legendOptions.width)
            .attr("height", legendOptions.height);


        var legendKeys = svg.selectAll(".keys")
            .data(SVGOptions.data.text).enter()
            .append("g")


        legendKeys.append("rect")
            .attr("x", legendOptions.x +legendOptions.padding)
            .attr("y", function (d, i) {
                return i * legendOptions.keyHeight +  legendOptions.padding;
            })
            .attr("width", legendOptions.keyHeight*(3/5))
            .attr("height", legendOptions.keyHeight*(3/5))
            .attr("fill", function (d, i) {
                return color(i);
            });


        legendKeys.append("text")
            .attr("text-anchor", "left")
            .attr("x", 335)
            .attr("y", function (d, i) {
                return i * legendOptions.keyHeight + legendOptions.padding +legendOptions.keyHeight/2 +2;
            })
            .attr("width", 120)
            .attr("height", 30)
            .text(function (d) {
                return d;
            });
    }

    var parseData= function(inputArray,valueField, textField)
    {
        //maps array of objects into object with array of values and text
        var separatedData= {};
        separatedData.values = inputArray.map(function(d)
        {
            return d[valueField];
        });
        separatedData.text = inputArray.map(function(d)
        {
            return d[textField];
        });
        return separatedData;
    }

    var createPieChart = function(options)
    {
        //convert data into a format the pie layout can work with ie arrays of values only;
        options.data =parseData(options.data, options.valueField, options.textField);

        var outerRadius= options.radius;
        var innerRadius=0;

        var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        var pie = d3.layout.pie();

        var svg=d3.select(options.target)
            .append("svg")
            .attr("width", options.width)
            .attr("height", options.height);


        var arcs= svg.selectAll("g.arc")
            .data(pie(options.data.values, function(d){
                return d.value;
            }))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius +"," + outerRadius+ ")");

        arcs.append("path")
            .attr("fill",function(d,i) { return color(i)})
            .attr("d", arc);

        ;

        arcs.append("text")
            .attr("transform",function(d){
                return "translate("+arc.centroid(d)+")"
            })
            .attr("text-anchor",  "middle")
            .text(function(d,i){
                return d.value +"%";
            });


        if (options.legend !==true)
            return;
        else
            createLegend(svg, options);


    }
    createPieChart(options);

};

