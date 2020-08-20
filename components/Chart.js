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
    const wrapper = select(wrapperRef.current);
    const svg = select(svgRef.current);
    const vertical = select(verticalRef.current);
    const tooltip = select(tooltipRef.current);
    let mousex;

    if (!dimensions) return;

    const xScale = scaleLinear().domain([0, prices.length - 1]).range([0, dimensions.width]);
    const yScale = scaleLinear().domain([Math.min(...prices) * 0.99, Math.max(...prices) * 1.01]).range([dimensions.height, 0]);

    const xAxis = axisBottom(xScale).ticks(times.length / 3).tickFormat(i => { if (i % 6 == 0) return times[i]});
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
      tooltip.style("opacity", 1)
      vertical.style("opacity", 1)
    }
    
    function mousemove() {
      var x0 = xScale.invert(d3.mouse(this)[0]);
      var i = bisect(data, x0, Math.round(x0) * 5);
      let selectedData = data[i];
      focusCircle
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


      const make_y_gridlines = () => d3.axisRight(yScale).ticks(4);

      svg.append("g")
      .attr("class","grid")
      .style("opacity", "0.15")
      .style("z-index", "-1")
  		.style("stroke-dasharray",("3"))
  		.call(make_y_gridlines()
        .tickSize(800)
        .tickFormat("")
      );


  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} className={classes.wrapper}>
      <svg ref={svgRef} className={classes.svg}>
        <g className="x-axis" />
        <g className="y-axis" />
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
