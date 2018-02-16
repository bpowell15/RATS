import * as d3 from 'd3';
import * as style from './map_style';
class Map {
  constructor(){
    this.map = new google.maps.Map(d3.select("#map").node(), {
      zoom: 11,
      markers: [],
      center: {lat: 40.7128, lng: -74.0060 },
      styles: style.style
    });
  }

  loadData(){

    d3.csv('rats.csv', (error, data)=>{
      if (error) throw error;
      const overlay = new google.maps.OverlayView();


      overlay.onAdd = ()=> {
        let layer = d3.select(overlay.getPanes().overlayMouseTarget).append("div")
        .attr("class", "rats")
        ;


        overlay.draw = ()=>{
          let projection = overlay.getProjection(),
          padding = 10;

          let div = d3.selectAll("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

          let marker = layer.selectAll("svg")
            .data(d3.entries(data))
            .each(transform) // update existing markers
            .enter().append("svg")
            .each(transform)
            .attr("class", "marker");

          marker.append("circle")
            .attr("r", 4.5)
            .attr("cx", padding)
            .attr("cy", padding)
            .style("fill", "rgba(255, 0, 0, .01)")
            .style("stroke", "none")
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Reported on: " + d.value["Created Date"].split(" ")[0] + "<br/>"  + "Closed on: " + d.value["Closed Date"].split(" ")[0])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 50) + "px")
                    .style("color", "black")
                    .style("background-color", "white")
                    ;
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

          // marker.append("text")
          //   .attr("x", padding + 7)
          //   .attr("y", padding)
          //   .attr("dy", ".31em")
          //   .text(function(d) {
          //     debugger
          //     return ("Reported on: " + d.value["Created Date"] + '<br>' + ' Resolved on: ' + d.value["Closed Date"]);
          //   });

          function transform(d) {

            d = new google.maps.LatLng(d.value.Latitude, d.value.Longitude);
            d = projection.fromLatLngToDivPixel(d);
            return d3.select(this)
                .style("left", (parseInt(d.x) - padding) + "px")
                .style("top", (parseInt(d.y) - padding) + "px");
          }
        };
      };
      overlay.setMap(this.map);
    });
  }

}

export default Map;
