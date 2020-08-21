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
    top: '0px',
    width: 'max-content',
    padding: '7.5px 10px',
    fontSize: '0.875rem',
    background: 'white',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    textAlign: 'center',
    opacity: '0'
  },
  vertical: {
    position: "absolute",
    zIndex: "-1",
    width: "1px",
    height: "calc(100% - 20px)",
    top: "0px",
    left: "0px",
    background: "#bbb",
    opacity: "0"
  },
  price: {
    margin: '0 10px 0 0',
    display: 'inline',
    fontWeight: '700'
  },
  time: {
    margin: 0,
    display: 'inline',
    color: '#666'
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
    const svg = select(svgRef.current);
    const vertical = select(verticalRef.current);
    const tooltip = select(tooltipRef.current);
    const bisect = d3.bisector(function(d) { return d.x; }).left;

    if (!dimensions) return;

    const xScale = scaleLinear().domain([0, prices.length - 1]).range([0, dimensions.width]);
    const yScale = scaleLinear().domain([Math.min(...prices) * 0.99, Math.max(...prices) * 1.01]).range([dimensions.height, 0]);

    const xAxis = axisBottom(xScale).ticks(dimensions.width > 600 ? times.length / 3 : times.length / 4).tickFormat(i => { if (i % 6 == 0) return times[i]});
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

    const focusCircle = svg
      .selectAll('.focus-circle')
        .style("opacity", 0)
    
    const focusCircleInner = svg
      .selectAll('.focus-circle-inner')
        .style("fill", "blue")
        .attr("stroke", "none")
        .attr('r', 5)

    svg
      .selectAll('.overlay')
        .data('1')
        .join('rect')
        .attr('class', 'overlay')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', "100%")
        .attr('height', "100%")
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout)
        .on('dblclick', dblclick);

    function mouseover() {
      focusCircle.style("opacity", 1)
      tooltip.style("opacity", 1)
      vertical.style("opacity", 1)
    }
    
    function mousemove() {
      let x0 = xScale.invert(d3.mouse(this)[0]);
      let i = bisect(data, x0, Math.round(x0) * 5);
      let selectedData = data[i];
      focusCircleInner
        .attr("cx", xScale(Math.round(x0)))
        .attr("cy", yScale(selectedData.price))
      tooltip
        .style("transform", "translateX(" + xScale(Math.round(x0)) + "px)")
        .style("left", "-" + tooltip._groups[0][0].clientWidth / 2 + "px")
      tooltip
      .selectAll(".price")
      .text(selectedData.price)
      tooltip
        .selectAll(".time")
        .text(selectedData.time)
      vertical
        .style("transform", "translateX(" + xScale(Math.round(x0)) + "px)");
    }

    function mouseout() {
      focusCircle.style("opacity", 0)
      tooltip.style("opacity", 0)
      vertical.style("opacity", 0)
    }

    function dblclick() {
      let x0 = xScale.invert(d3.mouse(this)[0]);
      let i = bisect(data, x0, Math.round(x0) * 5);
      let selectedData = data[i];
      svg
        .append('g')
        .append('circle')
          .style("fill", "red")
          .attr("stroke", "none")
          .attr('r', 5)
          .attr("class", "prediction")
          .attr("cx", xScale(Math.round(x0)))
          .attr("cy", yScale(selectedData.price));
    }

      const make_y_gridlines = () => d3.axisRight(yScale).ticks(4);

      svg
        .selectAll('.grid')
        .style("opacity", "0.15")
        .style("z-index", "-1")
        .style("stroke-dasharray",("3"))
        .call(make_y_gridlines()
          .tickSize(dimensions.width)
          .tickFormat("")
        );


  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="grid" />
        <g className="focus-circle"><circle className="focus-circle-inner" /></g>
      </svg>
      <div ref={verticalRef} className={classes.vertical} />
      <div ref={tooltipRef} className={classes.tooltip}>
        <p className={`${classes.price} price`}></p>
        <p className={`${classes.time} time`}></p>
      </div>
    </div>
  )
}

export default Chart;
