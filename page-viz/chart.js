let barsData = []
let chartDiv = document.getElementById("pages")
// set the dimensions and margins of the graph
let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = chartDiv.clientWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom


// set the ranges
let x = d3.scaleBand()
          .range([0, width])
          .padding(0.05)
let y = d3.scaleLinear()
          .range([height, 0])
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin

//Create Tooltip
let div = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0)

function update(data) {
    //set colors
    let colors = d3.scaleQuantize()
    .domain([0,data.length])
    .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", 
     "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"])
    
    //create svg
    let svg = d3.select("#pages").append("svg").attr("id", "svgid")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")")
    
  // Scale the range of the data in the domains
  x.domain(data.map(function(d, i) { return i }))
  y.domain([0, 60])

  // append the rectangles for the bar chart
  let bars = svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return x(i) })
      .attr("width", x.bandwidth())
      .attr("fill", function(d){ return colors(d.count) })
      .attr("y", function(d) { return y(60) })
      .attr("height", function(d) { return height - y(60) })
      .on("mouseover", function(d){ //on hover
          d3.selectAll(".bar").style("opacity", 0.2)
          d3.select(this).attr("width", "100px").style("opacity", 1)
          div.transition()
                .duration(50)
                .style("opacity", 1)
                .style("background-color", colors(d.count))
            div.html("Manuscript: "+ d.manuscript + "<br> PT-Number: " + d["pt-number"] + "<br> PT-Page: " + d["pt-page"] + "<br> TLP-Number: " + d["tlp-number"]+ "<br> Cross Reference: " + d["cross-reference"]+ "<br> Date: " + d["date"])
                 .style("left", (d3.event.pageX ) + "px")
                 .style("top", (d3.event.pageY-140) + "px")

            svg.append("text").attr("id", "pagenumber").style("text-anchor", "start")
            .attr("x", x(d.count)+40).attr("y", height+30).text(d["pt-page"])
      })
      .on("mouseout", function(d){
        d3.selectAll(".bar").style("opacity", 1)
          d3.select(this).attr("width", x.bandwidth())
          div.transition()
                 .duration(50)
                 .style("opacity", 0)
                 d3.selectAll("#pagenumber").remove()
      })
}
function checkRange(){//check selected pages range
    let val = d3.select("#pagerange").node().value
    let vallength = val.length
    let initial = val.substr(0,val.indexOf('-'))
    let final = val.substr(val.indexOf('-')+1, vallength)
    
    let lastData = [];
    for (let index = initial; index < final; index++) {
        lastData.push(barsData[index])
        console.log(".")
    }
    d3.select("#svgid").remove()
    
    lastData.forEach(function(ld, i) {
        ld["count"] = i
    })
    update(lastData)
}
d3.json("data.json").then(data => {
    let regularExpression= /(?<=\[).*?(?=\])/g
    let emptyPtpage = [];
    let nonemptyPtpage = []
    data.forEach((x, i) => {
        let dataval = String(x["pt-page"]);
        let val = dataval.match(regularExpression)
        let newString = dataval.substr(0,dataval.indexOf('['))
        if(val!=null){
            x["pt-page"] = newString + "." +val
            x["pt-page"] = +x["pt-page"];
            nonemptyPtpage.push(x)
        }
        else{
            emptyPtpage.push(x)
        }
        
    })
    nonemptyPtpage.sort(function(x, y){
         return d3.ascending(x["pt-page"], y["pt-page"])
    })
    let fdata = []
    fdata = nonemptyPtpage.concat(emptyPtpage)
    barsData = fdata
    checkRange()
})
d3.select("#pagerange").on("change", checkRange)