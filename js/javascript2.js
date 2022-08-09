var svg = d3.select("svg");
var margin = 200;
var width = svg.attr('width') - margin;
var height = svg.attr("height") - margin;

svg.append("text")
.attr("transform","translate(100,0)")
.attr("x",50)
.attr("y",50)
.attr("font-size", "30px")
.text("Total Number of Males in Uk census of 2011 and their ages")

var xScale = d3.scaleBand().range ([0, width]).padding(0.4);
var yScale = d3.scaleLinear().range ([height, 0]);


var g = svg.append("g")
.attr("transform","translate(" + 100 + "," + 100 + ")");


d3.csv("/js/testing.csv", function(error, data) {
        if (error) {
            throw error;
        }

        xScale.domain(data.map(function(d) { return d.Age; }));
       
        
        yScale.domain([0, d3.max(data, function(d) { return Math.max(d.Males); })]);
        


        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Age");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
                
             return  d;
             
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", -5)
         .attr("dy", "-6.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Number of Males");

        g.selectAll(".bar-chart")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar-chart")
         .attr("x", function(d) { return xScale(d.Age); })
         .attr("y", function(d) { return yScale(d.Males); })
         .attr("width", xScale.bandwidth())
         .attr("height", function(d) { return height - yScale(d.Males); });
    });
