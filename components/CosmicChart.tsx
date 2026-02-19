
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { PLANETS, SIGNS } from '../constants';

const CosmicChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2 - 40;
    
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .html(''); // Clear previous

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Outer circle for signs
    const outerRadius = radius + 20;
    const innerRadius = radius - 10;
    
    const arc = d3.arc<any>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle((d, i) => (i * 2 * Math.PI) / 12)
      .endAngle((d, i) => ((i + 1) * 2 * Math.PI) / 12);

    const signGroups = g.selectAll('.sign-arc')
      .data(SIGNS)
      .enter()
      .append('g');

    signGroups.append('path')
      .attr('d', arc as any)
      .attr('fill', d => {
        switch (d.element) {
          case 'Fire': return '#ef444466';
          case 'Earth': return '#10b98166';
          case 'Air': return '#06b6d466';
          case 'Water': return '#8b5cf666';
          default: return '#ccc';
        }
      })
      .attr('stroke', '#ffffff22');

    signGroups.append('text')
      .attr('transform', (d, i) => {
        const angle = (i * 30 + 15) * (Math.PI / 180);
        const x = Math.sin(angle) * (outerRadius + 15);
        const y = -Math.cos(angle) * (outerRadius + 15);
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '14px')
      .text(d => d.symbol);

    // Planets placement
    const planetData = PLANETS.map((p, i) => ({
      ...p,
      angle: (Math.random() * 360) * (Math.PI / 180)
    }));

    const planetNodes = g.selectAll('.planet-node')
      .data(planetData)
      .enter()
      .append('g')
      .attr('class', 'planet-node')
      .attr('transform', d => {
        const x = Math.sin(d.angle) * (innerRadius - 40);
        const y = -Math.cos(d.angle) * (innerRadius - 40);
        return `translate(${x}, ${y})`;
      })
      .style('cursor', 'pointer');

    planetNodes.append('circle')
      .attr('r', 12)
      .attr('fill', '#1a202c')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1);

    planetNodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#f7fafc')
      .style('font-size', '16px')
      .text(d => d.symbol);

    // Random aspect lines (aesthetic)
    const links = [];
    for(let i=0; i<8; i++) {
        const sourceIdx = Math.floor(Math.random() * planetData.length);
        const targetIdx = Math.floor(Math.random() * planetData.length);
        if(sourceIdx !== targetIdx) {
            links.push({ source: planetData[sourceIdx], target: planetData[targetIdx] });
        }
    }

    g.selectAll('.aspect-line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => Math.sin(d.source.angle) * (innerRadius - 40))
      .attr('y1', d => -Math.cos(d.source.angle) * (innerRadius - 40))
      .attr('x2', d => Math.sin(d.target.angle) * (innerRadius - 40))
      .attr('y2', d => -Math.cos(d.target.angle) * (innerRadius - 40))
      .attr('stroke', () => Math.random() > 0.5 ? '#60a5fa33' : '#f8717133')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '5,5');

  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-900 rounded-full p-4 border border-gray-800 shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <svg ref={svgRef} className="w-full max-w-[500px] h-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
    </div>
  );
};

export default CosmicChart;
