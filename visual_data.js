import * as d3 from 'd3';
function VisualData (){

    let returnColor;
    let circleRadii = [40, 20, 10];
    const xCoord = [30, 60, 120];
    const yCoord = [30, 60, 120];
    let i = 0;
    const svgContainer = d3.select("map").append("svg")
    .attr("width", 200)
    .attr("height", 200)
    ;
      const circles = svgContainer.selectAll("circle")
      .data(circleRadii)
      .enter()
      .append("circle")
      const circleAttributes = circles.attr("cx", (d)=>{ return d;})
      .attr("cy", (d)=>{return d;})
      .attr("r", (d)=>{ return d;})
      .style("fill", (d) => {
        if (d=== circleRadii[0]) {
          returnColor = "green";
        } else if ( d===circleRadii[1] ) {
          returnColor = "purple";
        } else if (d === circleRadii[2]) {
          returnColor = "red";
        }
        return returnColor;
      });
      let result = [];
      circleRadii.forEach((r)=>{result.push(r*2)});
      circleRadii = result;
      circleAttributes.exit()
}

export default VisualData;
