'use client';

import React from 'react';
import { Row, Col } from 'antd';

interface GridProps {
  children: React.ReactNode;
  gutter?: number | [number, number];
  className?: string;
}

interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  gutter = 16,
  className = '',
}) => {
  return (
    <Row gutter={gutter} className={className}>
      {children}
    </Row>
  );
};

export const GridItem: React.FC<GridItemProps> = ({
  children,
  span = 24,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className = '',
}) => {
  return (
    <Col
      span={span}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      className={className}
    >
      {children}
    </Col>
  );
};

export default Grid; 