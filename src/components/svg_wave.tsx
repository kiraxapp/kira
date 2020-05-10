// @ts-nocheck

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

export namespace SvgWave {
  export interface Props {
    points?: number;
    waveHight?: number;
    waveDelta?: number;
    speed?: number;
    fill?: string;
  }

  const elements = {
    content: styled.div`
      pointer-events: none;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    `,
  };
  export const h: React.FC<Props> = function svg_wave({ points = 8, speed = 0.12, waveDelta = 100, waveHight = 0, fill = '#FFC852' }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wave = useRef<SVGPathElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(waveHight);
    const totalWavePoints = points;
    const angle = 90;

    function calculate_wave_points(factor: number) {
      const points = [];
      for (let i = 0; i <= totalWavePoints; i++) {
        let x = (i / totalWavePoints) * width;
        const sinSeed = (factor + (i + (i % totalWavePoints))) * speed * 100;
        const sinHeight = Math.sin(sinSeed / 100) * waveDelta;

        let y = Math.sin(sinSeed / 90) * sinHeight + height * 0.8;
        points.push({ x, y });
      }
      return points;
    }

    function build_path(points: any[]) {
      let SVGString = `M${points[0].x} ${points[0].y}`;
      const cp0 = {
        x: (points[1].x - points[0].x) / 2,
        y: points[1].y - points[0].y + points[0].y + (points[1].y - points[0].y),
      };
      SVGString += `C${cp0.x} ${cp0.y} ${cp0.x} ${cp0.y} ${points[1].x} ${points[1].y}`;
      let prevCp = cp0;
      for (let i = 1; i < points.length - 1; i++) {
        const cp1 = {
          x: points[i].x - prevCp.x + points[i].x,
          y: points[i].y - prevCp.y + points[i].y,
        };
        SVGString += ' C ' + cp1.x + ' ' + cp1.y + ' ' + cp1.x + ' ' + cp1.y + ' ' + points[i + 1].x + ' ' + points[i + 1].y;
        prevCp = cp1;
      }
      SVGString += ` L ${width} ${height}`;
      SVGString += ` L 0 ${height} Z`;
      return SVGString;
    }

    useEffect(() => {
      setWidth(containerRef.current!.offsetWidth);
      setHeight(containerRef.current!.offsetHeight);
    }, [containerRef]);

    useEffect(() => {
      let lastUpdate: number;
      let totalTime = 0;
      const pos = {
        x: 0,
        y: 0,
      };

      // addEventListener('mousemove', (event) => {
      //   pos.x = event.pageX;
      //   pos.y = event.pageX;
      // });

      function tick() {
        const now = window.Date.now();
        if (lastUpdate) {
          const elapsed = (now - lastUpdate) / 3000;
          lastUpdate = now;
          totalTime += elapsed;
          const factor = totalTime * Math.PI;
          wave.current!.setAttribute('d', build_path(calculate_wave_points(factor)));
          const radians = (Math.PI / 180) * angle;
          const cos = Math.cos(radians);
          const sin = Math.cos(radians);
          const nx = cos * (width - 0) + sin * (height - 0) + 0;
          const ny = cos * (height - 0) - sin * (width - 0) + 0;
          const axis = {
            y: height / 2,
            x: width / 2,
          };
          // wave.current!.setAttribute(
          //  'd',
          //  `M0 ${axis.y}C0 ${axis.y} ${axis.y} ${axis.y} ${width} ${axis.y} L ${width} ${height} L 0 ${height} Z`,
          // );
          // wave.current!.setAttribute('d', `M0 ${axis.y} ${width} ${axis.y} L ${width} ${height} L 0 ${height} Z`);
          const boxWidth = width;
          const boxHeight = 200;
          const origin = {
            x: width / 2,
            y: height / 2,
          };
          const boxStart = {
            x: 0,
            y: height - boxHeight,
          };

          const aa = { x: boxStart.x, y: boxStart.y };
          const ab = { x: boxWidth, y: aa.y };
          const bb = { x: ab.x, y: ab.y + boxHeight };
          const ba = { x: aa.x, y: bb.y };
          // wave.current!.setAttribute('d', `M${aa.x} ${aa.y} L${ab.x} ${ab.y} L${bb.x} ${bb.y} L${ba.x} ${ba.y} Z`);
        } else {
          lastUpdate = now;
        }

        window.requestAnimationFrame(tick);
      }

      tick();
    }, [width]);

    return (
      <elements.content ref={containerRef} aria-hidden='true'>
        <svg width='100%' height='100%'>
          <path ref={wave} d='' fill={fill} />
        </svg>
      </elements.content>
    );
  };
}
