import { useRef, useEffect, useState } from 'react';
import { select, line, axisBottom, axisRight, scaleLinear } from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import ResizeObserver from 'resize-observer-polyfill';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '90vw',
    maxWidth: '800px',
    height: '90vw',
    maxHeight: '400px',
    margin: '20px auto 0',
    padding: '0 20px 20px 0'
  },
  svg: {
    background: 'none',
    overflow: 'visible',
    width: '100%',
    height: '100%'
  }
}));

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      })
    })
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    }
  }, [ref]);
  return dimensions;
}

const Chart = ({ data }) => {
  const classes = useStyles();
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const prices = [];
  const times = [];

  data.map((item, index) => {
    if (index % 5 != 0) return;
    prices.push(item.price);
    times.push(item.time);
  });

  useEffect(() => {
    const svg = select(svgRef.current);

    if (!dimensions) return;

    const xScale = scaleLinear().domain([0, prices.length - 1]).range([0, dimensions.width]);
    const yScale = scaleLinear().domain([Math.min(...prices) * 0.99, Math.max(...prices) * 1.01]).range([dimensions.height, 0]);

    // TODO - Adjust ticks and format to time
    const xAxis = axisBottom(xScale).ticks(prices.length / 10).tickFormat(index => index);
    svg.select('.x-axis').style('transform', 'translateY(100%)').call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select('.y-axis').style('transform', 'translateX(100%)').call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale);

    svg
      .selectAll('.line')
      .data([prices])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  )
}

export default Chart;
