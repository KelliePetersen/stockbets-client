import { useRef, useEffect, useState } from 'react';
import { select, line, axisBottom, axisRight, scaleLinear } from 'd3';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  svg: {
    background: '#eee',
    overflow: 'visible',
    margin: '20px',
    width: '90vw',
    maxWidth: '800px',
    height: '90vw',
    maxHeight: '400px'
  }
}));

const Chart = () => {
  const [data, setData] = useState([25, 30, 45, 60, 15, 30, 75, 100]);
  const classes = useStyles();
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 800]);
    const yScale = scaleLinear().domain([0, 100]).range([400, 0]);

    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index => index + 1);
    svg.select('.x-axis').style('transform', 'translateY(100%)').call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis').style('transform', 'translateX(100%)').call(yAxis);

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
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </>
  )
}

export default Chart;
