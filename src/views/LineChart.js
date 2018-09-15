import React from 'react';
import { scaleLinear, scaleTime } from 'd3-scale';
import { utcParse } from 'd3-time-format';
import { line as d3Line } from 'd3-shape';
import { extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import './LineChart.css';

const dataNormalizer = (data) => {
    const parseTimeWithMill = utcParse("%Y-%m-%dT%H:%M:%S.%L%Z");
    const parseTime = utcParse("%Y-%m-%dT%H:%M:%S%Z");
    const convertTod3Date = (date) => parseTimeWithMill(date) ? parseTimeWithMill(date) : parseTime(date); 
    data.map(d => d.x=convertTod3Date(d.x))
    const compareDates = (a, b) =>  a.x - b.x;
    data.sort(compareDates);
    return data;
}

const LineChart = ({dataRecieved}) => {
    dataRecieved = dataNormalizer(dataRecieved);
    const svgWidth = 960,
        svgHeight = 500;
  
    const margin = { top: 20, right: 80, bottom: 30, left: 50 },
        width = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top - margin.bottom;
    
    const x = scaleTime().range([0, width]),
        y = scaleLinear().range([height, -5]);
    
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
                <text 
                    transform={`translate(${x(dataRecieved[3].x)}, ${y(dataRecieved[3].y)})`}
                    x={-1}
                    dy="0.35em"
                    style={{ font: '10px sans-serif' }}
                >
                    Test data
                </text>
            </g>
        </g>
      </svg>
    )
};

export default LineChart;