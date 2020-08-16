import { useRef, useEffect, useState } from 'react';
import { select, line } from 'd3';

const Chart = () => {
  const [data, setData] = useState([25, 30, 45, 60, 15, 30, 75, 100]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const myLine = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value);
    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue')
  }, [data])

  return (
    <>
      <svg ref={svgRef} style={{background: '#eee'}}></svg>
    </>
  )
}

export default Chart;
