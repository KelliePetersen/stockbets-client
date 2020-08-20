import { useRef, useEffect, useState } from 'react';
import { select, line, axisBottom, axisRight, scaleLinear } from 'd3';
import { makeStyles } from '@material-ui/core/styles';
import ResizeObserver from 'resize-observer-polyfill';
import * as d3 from "d3";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: '0 20px 20px 0'
  },
  svg: {
    background: 'none',
    overflow: 'visible',
    width: '100%',
    height: '100%'
  },
  tooltip: {
    position: 'absolute',
    textAlign: 'center',
    width: '60px',
    height: '28px',
    padding: '2px',
    font: '12px sans-serif',
    background: 'lightsteelblue',
    border: '0px',
    borderRadius: '8px'
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
  const verticalRef = useRef();
  const tooltipRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const prices = [];
  const times = [];

  data.map((item, index) => {
    if (index % 5 != 0) return;
    prices.push(item.price);
    times.push(item.time);
  });

  useEffect(() => {
    const wrapper = select(wrapperRef.current);
    const svg = select(svgRef.current);
    const vertical = select(verticalRef.current);
    const tooltip = select(tooltipRef.current);
    let mousex;

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

    svg
      .on("mousemove", function(){    
        mousex = d3.mouse(this);
        mousex = mousex[0] + 0;
        if (mousex < 780) {
          vertical.style("transform", "translateX(" + mousex + "px)");
          vertical.style("opacity", "1" );
        }
      })
      .on("mouseover", function(){  
        mousex = d3.mouse(this);
        mousex = mousex[0] + 0;
        if (mousex < 780) {
          vertical.style("transform", "translateX(" + mousex + "px)");
          vertical.style("opacity", "1" );
        }
      })
      .on("mouseleave", function() {
        vertical.style("opacity", "0" );
      })
      .on("dblclick", () => {
        wrapper
          .append("div")
          .attr("class", "prediction")
          .style("position", "absolute")
          .style("top", "10px")
          .style("left", mousex + "px")
          .style("transform", "translateX(-5px)")
          .style("z-index", "5")
          .style("width", "10px")
          .style("height", "10px")
          .style("border-radius", "50%")
          .style("background", "red");
      });

    vertical
      .style("position", "absolute")
      .style("z-index", "-1")
      .style("width", "1px")
      .style("height", "calc(100% - 20px)")
      .style("top", "0px")
      .style("left", "0px")
      .style("background", "#bbb")
      .style("opacity", "0");

    tooltip
      .style("opacity", "0");

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <div ref={verticalRef} className={classes.vertical} />
      <div ref={tooltipRef} className={classes.tooltip} />
    </div>
  )
}

export default Chart;
