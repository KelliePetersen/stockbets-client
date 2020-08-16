import { useRef, useEffect, useState } from 'react';
import { select, line, axisBottom, scaleLinear } from 'd3';

const Chart = () => {
  const [data, setData] = useState([25, 30, 45, 60, 15, 30, 75, 100]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300]);
    const yScale = scaleLinear().domain([0, 100]).range([150, 0]);

    const xAxis = axisBottom(xScale);
    svg.select('.x-axis').style('transform', 'translateY(150px)').call(xAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');

  }, [data]);

  return (
    <>
      <svg ref={svgRef} style={{background: '#eee', overflow: 'visible'}}>
        <g className="x-axis" />
      </svg>
    </>
  )
}

export default Chart;
