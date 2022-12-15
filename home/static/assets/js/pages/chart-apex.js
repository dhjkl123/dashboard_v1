$(function() 
    {   const color =[];
        while (color.length < 20) {
            do {
                var arrs = Math.floor((Math.random()*1000000)+1);
            } while (color.indexOf(arrs) >= 0);
            color.push("#" + ("000000" + arrs.toString(16)).slice(-6));
        }
        const city_json = dict
        var wordcloud = []
        var dataYear = []
        var dataPop=[]
        var dataCate=[]
        for(var i = 0; i< city_json.length;i++){
            wordcloud.push({
                year:String(city_json[i].year),
                count:city_json[i].population,
                categories:String(city_json[i].name)
        });
        }
        for(var i = 0; i< city_json.length;i++){
            dataYear.push(
                String(city_json[i].year)
            );
        }
        for(var i = 0; i< city_json.length;i++){
            dataPop.push(
                city_json[i].population,
            );
        }
        for(var i = 0; i< city_json.length;i++){
            dataCate.push(
                String(city_json[i].name),
            );
        }
        var options_bar = {
            series: [{
              name: "Desktops",
              data: dataPop
          }],
            chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: dataYear,
          }
          };
        var chart_bar = new ApexCharts(document.querySelector("#line-chart-1"), options_bar);
        chart_bar.render();

        var options_pie = {
            series: dataPop,
            chart: {
            width: 380,
            type: 'donut',
          },
          labels: dataCate,
          colors:color,
          responsive: [{
            breakpoint: 480,
            options: {
                plotOptions: {
                    pie: {
                        expandOnClick: false,
                        donut: {
                            size: 200
                      }
                    }
                  },
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
          };
  
          var chart_pie = new ApexCharts(document.querySelector("#pie-chart-1"), options_pie);
          chart_pie.render();
          // d3
          var fill = d3.scaleOrdinal(d3.schemeCategory20);
          console.log(fill)
          var layout = d3.layout.cloud()
                      .size([700, 300])
                      .words(wordcloud)
                      .on("end", draw);
          layout.start();
          function draw(words) {
            d3.select("#my_dataviz")
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter()
            .append("text")
            .text((d) => d.categories)
            .style("font-size", (d) => d.count/3000 + "px")
            .style("fill", (d, i) => fill(i))
            .style("font-family", (d) => d.font)
            .attr("text-anchor", "middle")
            .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")");
    }
})