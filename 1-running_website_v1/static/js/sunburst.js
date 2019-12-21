// URL: https://observablehq.com/@romina-r/zoomable-sunburst
// Title: Zoomable Sunburst
// Author: romina-r (@romina-r)
// Version: 369
// Runtime version: 1

const m0 = {
    id: "e8bf9e7050b66f7c@369",
    variables: [
      {
        inputs: ["md"],
        value: (function(md){return(
  md`# Zoomable Sunburst
  
  This variant of a [sunburst diagram](/@d3/sunburst) shows only two layers of the hierarchy at a time. Click a node to zoom in, or the center to zoom out. Compare to an [icicle](/@d3/zoomable-icicle).`
  )})
      },
      {
        name: "chart",
        inputs: ["partition","data","d3","width","color","arc","format","radius"],
        value: (function(partition,data,d3,width,color,arc,format,radius)
  {
    const root = partition(data);
  
    root.each(d => d.current = d);
  
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, width])
        .style("font", "10px sans-serif");
  
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);
  
    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("d", d => arc(d.current));
  
    path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);
  
    path.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);
  
    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);
  
    function clicked(p) {
      parent.datum(p.parent || root);
  
      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });
  
      const t = g.transition().duration(750);
  
      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
          .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween("d", d => () => arc(d.current));
  
      label.filter(function(d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
    }
    
    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
  
    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }
  
    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  
    return svg.node();
  }
  )
      },
      {
        name: "data",
        value: (function(){return(
  { 
      "name":"all respondents",
      "children":[ 
          { 
              "name":"different sex couple",
              "children":[ 
                  { 
                      "name":"married",
                      "children":[ 
                          { 
                              "name":"met as neighbors",
                              "value":20
                          },
                          { 
                              "name":"met at church",
                              "value":116
                          },
                          { 
                              "name":"met at school",
                              "value":376
                          },
                          { 
                              "name":"met at work",
                              "value":490
                          },
                          { 
                              "name":"met f and f",
                              "value":274
                          },
                          { 
                              "name":"met offline dating",
                              "value":15
                          },
                          { 
                              "name":"met online",
                              "value":95
                          },
                          { 
                              "name":"met other",
                              "value":3
                          },
                          { 
                              "name":"met party",
                              "value":187
                          },
                          { 
                              "name":"met public space",
                              "value":148
                          },
                          { 
                              "name":"met social",
                              "value":57
                          },
                          { 
                              "name":"met travel",
                              "value":29
                          }
                      ]
                  },
                  { 
                      "name":"not married",
                      "children":[ 
                          { 
                              "name":"met as neighbors",
                              "value":15
                          },
                          { 
                              "name":"met at church",
                              "value":25
                          },
                          { 
                              "name":"met at school",
                              "value":101
                          },
                          { 
                              "name":"met at work",
                              "value":161
                          },
                          { 
                              "name":"met f and f",
                              "value":99
                          },
                          { 
                              "name":"met offline dating",
                              "value":2
                          },
                          { 
                              "name":"met online",
                              "value":114
                          },
                          { 
                              "name":"met party",
                              "value":69
                          },
                          { 
                              "name":"met public space",
                              "value":62
                          },
                          { 
                              "name":"met social",
                              "value":32
                          },
                          { 
                              "name":"met travel",
                              "value":15
                          }
                      ]
                  }
              ]
          },
          { 
              "name":"same sex couple",
              "children":[ 
                  { 
                      "name":"married",
                      "children":[ 
                          { 
                              "name":"met at church",
                              "value":3
                          },
                          { 
                              "name":"met at school",
                              "value":14
                          },
                          { 
                              "name":"met at work",
                              "value":16
                          },
                          { 
                              "name":"met f and f",
                              "value":8
                          },
                          { 
                              "name":"met offline dating",
                              "value":1
                          },
                          { 
                              "name":"met online",
                              "value":15
                          },
                          { 
                              "name":"met other",
                              "value":1
                          },
                          { 
                              "name":"met party",
                              "value":9
                          },
                          { 
                              "name":"met public space",
                              "value":9
                          },
                          { 
                              "name":"met social",
                              "value":14
                          },
                          { 
                              "name":"met travel",
                              "value":4
                          }
                      ]
                  },
                  { 
                      "name":"not married",
                      "children":[ 
                          { 
                              "name":"met as neighbors",
                              "value":4
                          },
                          { 
                              "name":"met at church",
                              "value":7
                          },
                          { 
                              "name":"met at school",
                              "value":20
                          },
                          { 
                              "name":"met at work",
                              "value":75
                          },
                          { 
                              "name":"met f and f",
                              "value":37
                          },
                          { 
                              "name":"met offline dating",
                              "value":5
                          },
                          { 
                              "name":"met online",
                              "value":95
                          },
                          { 
                              "name":"met party",
                              "value":38
                          },
                          { 
                              "name":"met public space",
                              "value":44
                          },
                          { 
                              "name":"met social",
                              "value":43
                          },
                          { 
                              "name":"met travel",
                              "value":6
                          }
                      ]
                  }
              ]
          }
      ]
  }
  )})
      },
      {
        name: "partition",
        inputs: ["d3"],
        value: (function(d3){return(
  data => {
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
      (root);
  }
  )})
      },
      {
        name: "color",
        inputs: ["d3","data"],
        value: (function(d3,data){return(
  d3.scaleOrdinal(d3.quantize(d3.interpolateWarm, data.children.length + 1))
  )})
      },
      {
        name: "format",
        inputs: ["d3"],
        value: (function(d3){return(
  d3.format(",d")
  )})
      },
      {
        name: "width",
        value: (function(){return(
  932
  )})
      },
      {
        name: "radius",
        inputs: ["width"],
        value: (function(width){return(
  width / 6
  )})
      },
      {
        name: "arc",
        inputs: ["d3","radius"],
        value: (function(d3,radius){return(
  d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius)
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require("d3@5")
  )})
      }
    ]
  };
  
  const notebook = {
    id: "e8bf9e7050b66f7c@369",
    modules: [m0]
  };
  
//   export default notebook;