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

    const bisect = d3.bisector(function(d) { return d.x; }).left;
    const focusCircle = svg
      .append('g')
      .append('circle')
        .style("fill", "blue")
        .attr("stroke", "none")
        .attr('r', 5)
        .style("opacity", 0)
    const focusText = svg
      .append('g')
      .append('text')
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")
    svg
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', "100%")
      .attr('height', "100%")
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);

    function mouseover() {
      focusCircle.style("opacity", 1)
      focusText.style("opacity", 1)
      vertical.style("opacity", 1)
    }
    
    function mousemove() {
      var x0 = xScale.invert(d3.mouse(this)[0]);
      var i = bisect(data, x0, Math.round(x0) * 5);
      let selectedData = data[i];
      focusCircle
        .attr("cx", xScale(Math.round(x0)))
        .attr("cy", yScale(selectedData.price))
      focusText
        .html(selectedData.price + " " + selectedData.time)
        .attr("x", xScale(Math.round(x0)) + 15)
        .attr("y", yScale(selectedData.price))
      vertical
        .style("transform", "translateX(" + xScale(Math.round(x0)) + "px)");
      }
    function mouseout() {
      focusCircle.style("opacity", 0)
      focusText.style("opacity", 0)
      vertical.style("opacity", 0)
    }

    svg
      .selectAll('.line')
      .data([prices])
      .join('path')
      .attr('class', 'line')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');

    svg
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
