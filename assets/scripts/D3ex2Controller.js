
angular.module('D3ex2Controller', [])

.controller('d3ex2Ctrl', function ($scope, $http) {

    d3.json('./assets/data/data.json', function (data) {
        var clickTag = 1;

        var v3 = d3.select('.ex2').selectAll('circle').data(data);
        v3.enter().append('circle');

        d3.select('.ex2').selectAll('circle').attr({
            cx: function (d, i) { return i * 40 + 20; },
            cy: 100,
            r: function (d, i) { return d * 2; }
        })

        d3.select('.ex2').selectAll('circle').on('click', function () {
            if (clickTag == 0) {
                clickTag = 1;
            } else {
                clickTag = 0;
            }
            sortBar();
        });

        var sortBar = function () {

            d3.select('.ex2').selectAll('circle').sort(function (a, b) {
                if (clickTag == 0) {
                    return d3.ascending(a, b);
                } else {
                    return d3.ascending(b, a);
                }
            }).transition().duration(1000).attr({
                cx : function (d, i) { return i * 40 + 20; }
            });
        };
    })

    d3.json('./assets/data/topic2-2.json', function (data) {
        var clickTag = 2;

        var scaleX = d3.scale.pow().exponent(4).domain([0, 100]).range([50, 450]);
        var scaleY = d3.scale.pow().exponent(4).domain([0, 100]).range([450, 50]);

        var ticks = scaleX.ticks(20);

        var x = d3.select(".ex3").selectAll("rect.x").data(ticks);
        x.enter().append("rect").attr("class", "x");

        d3.select(".ex3").selectAll("rect.x").attr({
            x: function (d, i) { return scaleX(d); },
            y: 480,
            height: 10,
            width: 2,
            fill: "#000"
        });

        var y = d3.select(".ex3").selectAll("rect.y").data(ticks);
        y.enter().append("rect").attr("class", "y");

        d3.select(".ex3").selectAll("rect.y").attr({
            x: 10,
            y: function (d, i) { return scaleY(d); },
            height: 2,
            width: 10,
            fill: "#000"
        });

        var colorScale = d3.scale.linear().domain([1, 10]).range(["#090", "#f00"]);

        var dataCir = d3.select(".ex3").selectAll("circle.data").data(data);
        dataCir.enter().append("circle").attr("class", "data");

        d3.select(".ex3").selectAll("circle.data").attr({
            cx: function (d) {return scaleX(d[0]); },
            cy: function (d) {return scaleY(d[1]); },
            r: function (d) {return d[2] * 2; },
            fill: function (d) { return colorScale(d[2]); }
        });

        d3.select(".ex3").selectAll("circle.data").on('click', function () {
            if (clickTag == 0) {
                clickTag = 1;
            } else if (clickTag == 1) {
                clickTag = 2;
            } else if (clickTag == 2) {
                clickTag = 3;
            } else {
                clickTag = 0;
            }
            sortData();
        });

        var e3TransRectFunc = {
            0: function (d) { return scaleX(d); },
            1: function (d) { return 500 - scaleX(d); },
            2: function (d) { return scaleY(d); },
            3: function (d) { return 500 - scaleY(d); }
        }

        var e3TransCircleFunc = {
            0: function (d) { return scaleX(d[0]); },
            1: function (d) { return 500 - scaleX(d[0]); },
            2: function (d) { return scaleY(d[1]); },
            3: function (d) { return 500 - scaleY(d[1]); }
        }

        var sortData = function () {
            d3.select('.ex3').selectAll('circle.data').transition().duration(1000).attr({
                cx: e3TransCircleFunc[clickTag % 2],
                cy: e3TransCircleFunc[clickTag >= 2 ? clickTag : (clickTag + 1) % 2 + 2]
            });

            d3.select('.ex3').selectAll('rect.x').transition().duration(1000).attr({
                x: e3TransRectFunc[clickTag % 2],
                y: 480
            });

            d3.select('.ex3').selectAll('rect.y').transition().duration(1000).attr({
                x: 10,
                y: e3TransRectFunc[clickTag >= 2 ? clickTag : (clickTag + 1) % 2 + 2]
            });

        }
    });

    d3.json("./assets/data/topic2.json", function(data){
        var clickTag = 0;

        var dataNode = {children: data.map(function(value) { return {value: value}})};

        var d3Pack = d3.layout.pack().size([500, 500]).nodes(dataNode);
        d3Pack.shift();

        d3.select(".ex4").selectAll("circle.pack").on('click', function () {
            var d3PackTmp;
            if (clickTag == 0) {
                clickTag = 1;
                d3PackTmp = d3.layout.pack().size([500, 500]).sort(function (a, b) { return b.value - a.value;}).nodes(dataNode);
            } else {
                clickTag = 0;
                d3PackTmp = d3.layout.pack().size([500, 500]).sort(function (a, b) { return a.value - b.value;}).nodes(dataNode);
            }
            d3PackTmp.shift();
            ex4CreatePack(d3PackTmp);
        });

        var ex4CreatePack = function (d3Pack) {
            var colorScale = d3.scale.linear().domain([1, 10]).range(["#00f", "#0f0"]);

            var dataPack = d3.select(".ex4").selectAll("circle.pack").data(d3Pack);
            dataPack.enter().append("circle").attr("class", "pack");

            d3.select(".ex4").selectAll("circle.pack").transition().duration(1000).attr({
                cx: function (d, i) { return d.x; },
                cy: function (d, i) { return d.y; },
                r: function (d, i) { return d.r; },
                fill: function (d, i) { return colorScale(d.value); },
                stroke: "#000"
            });

            var dataText = d3.select(".ex4").selectAll("text.pack").data(d3Pack);
            dataText.enter().append("text").attr("class", "pack");

            d3.select(".ex4").selectAll("text.pack").transition().duration(1000).attr({
                x: function (d, i) { return d.x; },
                y: function (d, i) { return d.y; },
                fill: "#000",
                "text-anchor": "middle",
                "dominant-baseline": "central"
            }).text(function (d) { return d.value; });
        };

        ex4CreatePack(d3Pack);
    });
});
