import React from 'react';
import styled from 'styled-components';
import { Vec2 } from '@kira/std';

/**
 * change this
 */
export namespace Graph {
  export interface Props {
    points: Vec2[];
    stroke_width?: number;
    color?: string;
    stroke_linecap?: 'butt' | 'round' | 'square' | 'inherit';
  }

  const elements = {
    graph: styled.div``,
  };

  export const h: React.FC<Props> = function __kira__graph({ points, color, stroke_linecap, stroke_width }) {
    const width = 480;
    const height = 230;

    const translate_axis_relative_y_value = (yValue: number, height: number) => {
      const incrementedYValue = yValue * -1 + 1;

      return (incrementedYValue * height) / 2;
    };

    const drawable_points = points.map(({ x, y }) => {
      const relativeY = translate_axis_relative_y_value(y, height);

      return {
        x,
        y: relativeY,
      };
    });

    const svgPath = drawable_points.reduce((acc, { x, y }, index) => {
      if (index === 0) {
        return `M ${x},${y} `;
      }

      return `${acc} L ${x},${y}`;
    }, '');

    return (
      <elements.graph>
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
          <path
            d={svgPath}
            stroke={color || 'red'}
            strokeWidth={stroke_width || 5}
            strokeLinecap={stroke_linecap || 'inherit'}
            fill='none'
          />
        </svg>
      </elements.graph>
    );
  };
}
