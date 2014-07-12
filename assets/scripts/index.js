$(document).ready(function ()
{

    d3.json("./assets/data/data.json", function(data){

        // console.log(data);

        var tmpD3 = d3.select(".ex1").selectAll("circle.cir").data(data);
        tmpD3.exit().remove();
        tmpD3.enter().append("circle").attr("class", "cir");

        d3.select(".ex1").selectAll("circle.cir").attr({
            cx: function (d, i) { return d * 50 + 30; },
            cy: 100,
            r: function (d, i) {return i * 1.5; }
        })
    });


    d3.json("./assets/data/topic2-2.json", function(data) {

        var redius = d3.scale.pow().exponent(4).domain([0,100]).range([50,800]);

        var ticks = redius.ticks(20);

        var x = d3.select(".ex2").selectAll("rect.x").data(ticks);
        x.enter().append("rect").attr("class", "x");

        d3.select(".ex2").selectAll("rect.x").attr({
            x: redius,
            y: 875,
            height: 10,
            width: 2,
            fill: "#000"
        });

        var y = d3.select(".ex2").selectAll("rect.y").data(ticks);
        y.enter().append("rect").attr("class", "y");

        d3.select(".ex2").selectAll("rect.y").attr({
            x: 10,
            y: function (d, i) { return 900 - redius(d); },
            height: 2,
            width: 10,
            fill: "#000"
        });

        var colorScale = d3.scale.linear().domain([1, 10]).range(["#090", "#f00"]);

        var dataCir = d3.select(".ex2").selectAll("circle.data").data(data);
        dataCir.enter().append("circle").attr("class", "data");

        d3.select(".ex2").selectAll("circle.data").attr({
            cx: function (d) {return redius(d[0]); },
            cy: function (d) {return 900 - redius(d[1]); },
            r: function (d) {return d[2] * 2; },
            fill: function (d) { return colorScale(d[2]); }
        })
    });

    d3.json("./assets/data/topic2.json", function(data){

        var dataNode = {children: data.map(function(value) { return {value: value}})};

        var d3Pack = d3.layout.pack().size([900, 900]).nodes(dataNode);
        d3Pack.shift();

        var colorScale = d3.scale.linear().domain([1, 10]).range(["#00f", "#0f0"]);

        var dataPack = d3.select(".ex3").selectAll("circle.pack").data(d3Pack);
        dataPack.enter().append("circle").attr("class", "pack");

        d3.select(".ex3").selectAll("circle.pack").attr({
            cx: function (d, i) { return d.x; },
            cy: function (d, i) { return d.y; },
            r: function (d, i) { return d.r; },
            fill: function (d, i) { return colorScale(d.value); },
            stroke: "#000"
        })

        var dataText = d3.select(".ex3").selectAll("text.pack").data(d3Pack);
        dataText.enter().append("text").attr("class", "pack");

        d3.select(".ex3").selectAll("text.pack").attr({
            x: function (d, i) { return d.x; },
            y: function (d, i) { return d.y; },
            fill: "#000",
            "text-anchor": "middle",
            "dominant-baseline": "central"
        }).text(function (d) { return d.value; });
    });
});
