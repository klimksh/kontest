import React from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';

import { line as d3Line } from 'd3-shape';
import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import './LineChart.css';

const LineChart = ({dataRecieved}) => {

    const svgWidth = 960,
        svgHeight = 500;
  
    const margin = { top: 20, right: 80, bottom: 30, left: 50 },
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;
    
    const x = scaleTime().range([0, width]),
        y = scaleLinear().range([height, 0]);
    
    const line = d3Line()
        .x(d => x(d.x))
        .y(d => y(d.y));
    
    x.domain(extent(dataRecieved, data => data.x));
    y.domain(extent(dataRecieved, data => data.y));
    
    return (
        <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            className="axis axis--x"
            transform={`translate(0, ${height})`}
            ref={node => select(node).call(axisBottom(x))}
          >
          <text x="800" y="-3" dx="0.71em" fill="#000">
              Time
            </text>
          </g>
          <g className="axis axis--y" ref={node => select(node).call(axisLeft(y))}>
            <text transform="rotate(-90)" y="6" dy="0.71em" fill="#000">
              Values
            </text>
          </g>
          <g className="item">
            <path className="line" d={line(dataRecieved)}/>
            </g>
        </g>
      </svg>
    )
};

export default LineChart;